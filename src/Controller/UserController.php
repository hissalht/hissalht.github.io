<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use App\Entity\User;

class UserController extends Controller
{
    /**
     * @Route("/user", name="user_list")
     */
    public function listUsers()
    {
        $repo = $this->getDoctrine()->getRepository(User::class);
        $users = $repo->findAll();
        return $this->render('user/list.html.twig', [
            'users' => $users
        ]);
    }

    /**
     * @Route("/user/{id}", name="user_show", requirements={"id"="\d+"})
     */
    public function showUser(User $user)
    {
        return $this->render('user/show.html.twig', [
            'user' => $user
        ]);
    }
}
