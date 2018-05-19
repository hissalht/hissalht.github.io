<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MiscController extends Controller
{
    /**
     * @Route("/", name="blog_home")
     */
    public function index()
    {
        return $this->render('misc/index.html.twig', [
            'controller_name' => 'MiscController',
        ]);
    }

    /**
     * @Route("/about", name="blog_about")
     */
    public function about()
    {
        return $this->render('misc/about.html.twig');
    }

    /**
     * @Route("/curriculum", name="blog_curriculum")
     */
    public function curriculum()
    {
        return $this->render('misc/cv.html.twig');
    }

    /**
     * @Route("/curriculum/app", name="blog_curriculum_app")
     */
    public function curriculumApp()
    {
        return $this->render('misc/cv-app.html.twig');
    }
}
