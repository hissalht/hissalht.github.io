<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\User;
use App\Entity\BlogPost;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $this->createUsers($manager);
        $this->createBlogPosts($manager);

        $manager->flush();
    }

    private function createUsers($manager)
    {
        $user = $this->createUser('adrien', 'example@example.co', 'adrienpassword', array('ROLE_USER'));
        $manager->persist($user);

        $adminUser = $this->createUser('admin', 'admin@example.co', 'adminpassword', array('ROLE_USER', 'ROLE_ADMIN'));
        $manager->persist($adminUser);
    }

    private function createUser($username, $email, $password, $roles)
    {
        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setRoles($roles);
        $encoded = $this->encoder->encodePassword($user, $password);
        $user->setPassword($encoded);
        return $user;
    }

    private function createBlogPosts($manager)
    {

    }
}
