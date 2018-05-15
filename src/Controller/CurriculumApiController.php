<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CurriculumApiController extends Controller
{
    /**
     * @Route("/curriculum/api", name="curriculum_api")
     */
    public function index()
    {
        return $this->render('curriculum_api/index.html.twig', [
            'controller_name' => 'CurriculumApiController',
        ]);
    }
}
