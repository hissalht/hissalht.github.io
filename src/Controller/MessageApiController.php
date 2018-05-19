<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

use Psr\Log\LoggerInterface;


use App\Entity\Message;
use App\Entity\Conversation;
use App\Entity\User;

/**
 * @Route("/api")
 * @Security("has_role('ROLE_USER')")
 */
class MessageApiController extends Controller
{

    /**
     * Request the messages from a conversation. Use the 'conversation' parameter.
     * @Route("/message",
     *     name="message_api_get_messages",
     *     methods="GET")
     */
    public function getMessages(Request $request, LoggerInterface $logger)
    {
        $user = $this->getUser();
        $convRepo = $this->getDoctrine()->getRepository(Conversation::class);

        $criteria = array(
            'destination' => (int)$request->query->get('conversation'),
        );

        $conversation = $convRepo->find($criteria['destination']);

        if (!$conversation->getParticipants()->contains($user)) {
            return AccessDeniedHttpException('The current user is not part of conversation ' . $conversation->getId());
        }


        $result = $conversation->getMessages()->toArray();

        $data = array();
        foreach($result as $message) {
            array_push($data, $this->convertMessageToArray($message));
        }


        $logger->info("getMessages", $data);

        return new JsonResponse($data);

    }

    /**
     * @Route("/message/{id}",
     *     name="message_api_get_message",
     *     methods="GET",
     *     requirements={"id"="\d+"})
     */
    public function getMessage(Request $request, Message $message)
    {
        $user = $this->getUser();

        if(!$message->getDestination()->getParticipants()->contains($user)){
            throw new AccessDeniedHttpException('You cannot access this message');
        }

        return new JsonResponse($this->convertMessageToArray($message));
    }

    /**
     * @Route("/message",
     *     name="message_api_post_message",
     *     methods="POST")
     */
    public function postMessage(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $messageArray = json_decode($request->getContent(), true);

        if(!(array_key_exists('destination', $messageArray)
            && array_key_exists('content', $messageArray))
        ){
            throw new BadRequestHttpException('destination and content are required');
        }

        $user = $this->getUser();
        $destinationId = (int) $messageArray['destination'];
        $messageContent = $messageArray['content'];

        $convRepo = $this->getDoctrine()->getRepository(Conversation::class);
        $conv = $convRepo->find($destinationId);

        if(is_null($conv)){
            // unknown conversation
            throw new BadRequestHttpException('Conversation ' .$destinationId. ' does not exist.');
        }

        if(!$conv->getParticipants()->contains($user)){
            // user is not part of the conversation
            throw new AccessDeniedHttpException('User ' .$user->getUserName(). ' is not part of conversation ' .$conv->getId(). '.');
        }

        $message = new Message();
        $message->setDestination($conv);
        $message->setSender($user);
        $message->setContent($messageContent);
        $message->setPostDate(new \DateTimeImmutable('now'));

        $entityManager->persist($message);
        $entityManager->flush();

        return new Response($message->getId());
    }

    /**
     * @Route("/conversation",
     *     name="message_api_get_conversations",
     *     methods="GET")
     */
    public function getConversations(Request $req)
    {
        $user = $this->getUser();

        $conversations = $user->getConversations();

        $data = array();
        foreach($conversations as $conversation) {
            array_push($data, $this->convertConversationToArray($conversation));
        }
        return new JsonResponse($data);
    }

    /**
     * @Route("/conversation/{id}",
     *     name="message_api_get_conversation",
     *     methods="GET",
     *     requirements={"id"="\d+"})
     */
    public function getConversation(Conversation $conversation)
    {
        return new JsonResponse($this->convertConversationToArray($conversation));
    }

    /**
     * @Route("/user/{id}",
     *     name="message_api_get_user",
     *     methods="GET",
     *     requirements={"id"="\d+"})
     */
    public function getMessageUser(User $user)
    {
        return new JsonResponse($this->convertUserToArray($user));
    }

    /**
     * @Route("/user/current",
     *     name="message_api_get_current_user",
     *     methods="GET")
     */
    public function getCurrentUser()
    {
        return new JsonResponse($this->convertUserToArray($this->getUser()));
    }

    private function convertMessageToArray($msg)
    {
        return array(
            'id' => $msg->getId(),
            'sender' => $msg->getSender()->getId(),
            'destination' => $msg->getDestination()->getId(),
            'postDate' => $msg->getPostDate(),
            'content' => $msg->getContent()
        );
    }

    private function convertConversationToArray($conversation)
    {
        $participants = array();
        $messages = array();
        foreach($conversation->getParticipants() as $user) {
            array_push($participants, $user->getId());
        }
        foreach($conversation->getMessages() as $msg) {
            array_push($messages, $msg->getId());
        }
        return array(
            'id' => $conversation->getId(),
            'participants' => $participants,
            'messages' => $messages
        );
    }

    private function convertUserToArray($user)
    {
        return array(
            'id' => $user->getId(),
            'username' => $user->getUsername(),
        );
    }
}
