<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\BlogPost;
use App\Entity\User;
use App\Form\BlogPostType;

/**
 * @Route("/blog")
 */
class BlogController extends Controller
{

    /**
     * @Route("/", name="blog_list")
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
     * @Route("/new", name="blog_new")
     * @Security("has_role('ROLE_USER')")
     */
    public function post(Request $request, LoggerInterface $logger)
    {
        $post = new BlogPost();
        $form = $this->createForm(BlogPostType::class, $post);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            // on a valid POST request
            $entityManager = $this->getDoctrine()->getManager();
            $user = $this->getUser();

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
     * Redirect to the the most recently posted blog post.
     * @Route("/last", name="blog_last")
     */
    public function getLastPost()
    {
        $repo = $this->getDoctrine()->getRepository(BlogPost::class);
        $p = $repo->getLastPost();

        return $this->redirectToRoute('blog_show', [
            'id' => $p->getId()
        ]);

    }

    /**
     * @Route("/{id}", name="blog_show", requirements={"id"="\d+"})
     */
    public function showPost(BlogPost $blogPost)
    {
        $repo = $this->getDoctrine()->getRepository(BlogPost::class);
        $previous = $repo->getPreviousPost($blogPost);
        $next = $repo->getNextPost($blogPost);
        $last = $repo->getLastPost();
        $first = $repo->getFirstPost();


        return $this->render('blog/show.html.twig', [
            'post' => $blogPost,
            'previous' => $previous,
            'next' => $next,
            'last' => $last,
            'first' => $first,
        ]);
    }
}
