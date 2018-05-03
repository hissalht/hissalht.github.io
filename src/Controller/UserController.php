<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


use App\Entity\User;
use App\Form\UserType;

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
     * @Route("/user/login", name="user_login")
     */
    public function login(Request $request, AuthenticationUtils $authUtils)
    {
        $error = $authUtils->getLastAuthenticationError();
        $lastUsername = $authUtils->getLastUsername();

        return $this->render('user/login.html.twig', array(
            'last_username' => $lastUsername,
            'error' => $error,
        ));
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

    /**
     * @Route("/user/signup", name="user_signup")
     */
    public function newUser(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();

            $user = $form->getData();
            $user->setRoles(['ROLE_USER']);
            $encoded = $encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($encoded);

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('user_login');

        } else {
            return $this->render('user/signup.html.twig', array(
                'form' => $form->createView(),
            ));
        }
    }

    private function checkUsername($username)
    {
        $repo = $this->getDoctrine()->getRepository(User::class);
        $u = $repo->findBy(array('username' => $username));
        return isnull($u);
    }

}
