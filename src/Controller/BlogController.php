<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\BlogPost;
use App\Entity\User;
use App\Form\BlogPostType;


class BlogController extends Controller
{

    /**
     * @Route("/blog", name="blog_list")
     */
    public function index()
    {
        $repository = $this->getDoctrine()->getRepository(BlogPost::class);
        $posts = $repository->findAll();
        return $this->render('blog/list.html.twig', [
            'posts' => $posts,
        ]);
    }

    /**
     * @Route("/blog/new", name="blog_new")
     */
    public function post(Request $request, LoggerInterface $logger)
    {
        $post = new BlogPost();
        $form = $this->createForm(BlogPostType::class, $post);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            // on a valid POST request
            $entityManager = $this->getDoctrine()->getManager();
            $user = $this->getDoctrine()->getRepository(User::class)->find(1);

            $post = $form->getData();
            $post->setPublicationDate(new \DateTimeImmutable("now"));
            $post->setEditDate(new \DateTime("now"));
            $post->setAuthor($user);

            $entityManager->persist($post);
            $entityManager->flush();

            $logger->info('Blog bnlopost submitted with id ' . $post->getId());

            return $this->redirectToRoute('blog_show', [
                'id' => $post->getId()
            ]);
        } else {
            // on GET or invalid POST request
            return $this->render('blog/edit.html.twig', array(
                'form' => $form->createView(),
            ));
        }
    }

    /**
     * @Route("/blog/{id}", name="blog_show", requirements={"id"="\d+"})
     */
    public function showPost(BlogPost $blogPost)
    {
        return $this->render('blog/show.html.twig', [
            'post' => $blogPost
        ]);
    }

    /**
     * @Route("/debug", name="blog_gen_user")
     */
    public function debug()
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = new User();
        $user->setName("root");
        $user->setStatus("debug");
        
        $entityManager->persist($user);
        $entityManager->flush();

        return new Response("Saved new user with id " . $user->getId());
    }
}