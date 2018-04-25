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

        $manager->flush();
    }

    private function createUsers($manager)
    {
        $user = $this->createUser('adrien', 'example@example.co', 'adrienpassword', array('ROLE_USER'));
        $manager->persist($user);

        $adminUser = $this->createUser('admin', 'admin@example.co', 'adminpassword', array('ROLE_USER', 'ROLE_ADMIN'));
        $manager->persist($adminUser);

        $post1 = $this->createBlogPost('Example', 'This is some content', $user);
        $post2 = $this->createBlogPost('Example2', '<h1>Title</h1><p>Parahraph paragragph</p>', $adminUser);
        $post3 = $this->createBlogPost('Example3', 'Example example', $adminUser);
        $post4 = $this->createBlogPost('Script content', '<script>alert(\'Breached !!\')', $adminUser);

        $manager->persist($post1);
        $manager->persist($post2);
        $manager->persist($post3);
        $manager->persist($post4);
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

    private function createBlogPost($title, $content, $author)
    {
        $post = new BlogPost();
        $post->setTitle($title);
        $post->setContent($content);
        $post->setAuthor($author);
        $post->setPublicationDate(new \DatetimeImmutable('now'));
        $post->setEditDate(new \Datetime('now'));
        return $post;
    }

}
