<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Curriculum\Education;
use App\Entity\Curriculum\Experience;


/**
 * @Route("/api/cv")
 */
class CurriculumApiController extends Controller
{
    private $serializer;

    public function __construct()
    {
        $encoders = array( new JsonEncoder());
        $normalizers = array(
            new DateTimeNormalizer(\DateTime::ISO8601),
            new ObjectNormalizer(),
            new ArrayDenormalizer(),
        );

        $this->serializer = new Serializer($normalizers, $encoders);
    }


    /**
     * @Route("/education/{id}", name="blog_cv_get_education", methods="GET", requirements={"id"="\d+"})
     */
    public function getEducation(Education $education)
    {
        $json = $this->serializer->serialize($education, 'json');
        return JsonResponse::fromJsonString($json);

    }

    /**
     * @Route("/education", name="blog_cv_get_education_list", methods="GET")
     */
    public function getEducationList()
    {
        $repo = $this->getDoctrine()->getRepository(Education::class);

        $educations = $repo->findAll();

        $data = array();
        foreach($educations as $e) {
            $data[$e->getid()] = $e;
        }

        $json = $this->serializer->serialize($data, 'json');
        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/experience/{id}", name="blog_cv_get_experience", methods="GET", requirements={"id"="\d+"})
     */
    public function getExperience(Experience $exp)
    {
        $json = $this->serializer->serialize($exp, 'json');
        return JsonResponse::fromJsonString($json);
    }

    /**
     * @Route("/experience", name="blog_cv_get_experience_list", methods="GET")
     */
    public function getExperienceList()
    {
        $repo = $this->getDoctrine()->getRepository(Experience::class);

        $experience = $repo->findAll();

        $data = array();
        foreach($experience as $e) {
            $data[$e->getid()] = $e;
        }

        $json = $this->serializer->serialize($data, 'json');
        return JsonResponse::fromJsonString($json);
    }

}
