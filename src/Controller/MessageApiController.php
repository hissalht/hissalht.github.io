<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

use App\Entity\Message;
use App\Entity\Conversation;

/**
 * @Route("/api")
 * @Security("has_role('ROLE_USER')")
 */
class MessageApiController extends Controller
{
    /**
     * @Route("/message/{id}",
     *     name="message_api",
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

    private function convertMessageToArray($msg)
    {
        return array(
            'id' => $msg->getId(),
            'sender' => $msg->getSender()->getId(),
            'destination' => $msg->getDestination()->getId(),
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
}
