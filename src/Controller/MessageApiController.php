<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/api/message")
 */
class MessageApiController extends Controller
{
    /**
     * @Route("/", name="message_api", methods="GET")
     */
    public function getMessage()
    {
        $response = new JsonResponse();
        $data = array(
            'sender' => 'adrien',
            'receiver' => 'bob',
            'content' => 'This is the message content.'
        );
        $response->setData($data);
        return $response;
    }
}
