<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

use App\Entity\User;
use App\Entity\BlogPost;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $this->createUsers($manager);
        $this->createBlogPosts($manager);

        $manager->flush();
    }

    private function createUsers(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('adrien');
        $user->setEmail('example@ex.com');
        
    }

    private function createBlogPosts(ObjectManager $manager)
    {

    }
}
