<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * @Route("/message")
 */
class MessageController extends Controller
{
    /**
     * @Route("/", name="message")
     */
    public function index()
    {
        return $this->render('message/index.html.twig');
    }
}
