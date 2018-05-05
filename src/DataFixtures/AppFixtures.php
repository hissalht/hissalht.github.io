<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\User;
use App\Entity\BlogPost;
use App\Entity\Message;
use App\Entity\Conversation;

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

        $bobUser = $this->createUser('bob', 'bob@exmaple.co', 'bobpassword', array('ROLE_USER'));
        $manager->persist($bobUser);

        $post1 = $this->createBlogPost('The good ol\' lorem ipsum', ' <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam ultrices mauris id pretium. Ut pellentesque lectus velit. Nulla laoreet faucibus arcu. Vivamus dolor dui, interdum sed pretium ac, ultricies quis ligula. Etiam orci nibh, semper nec dictum at, varius nec justo. Nunc tempor id libero a gravida. Phasellus tortor mauris, accumsan porta lobortis eu, laoreet sit amet turpis. Nam gravida mattis dapibus. Nunc sagittis, ex eu consectetur egestas, lorem metus vehicula ipsum, in feugiat magna arcu in odio. Aenean est ante, congue at bibendum at, euismod luctus quam. Curabitur vel purus at ante aliquet tincidunt volutpat ut ex. Nam ultrices nisi ut nisl congue, quis tincidunt augue iaculis.
        </p>
        <p>
        Praesent at justo et massa accumsan dictum. Aenean ac fermentum nibh. Sed sed molestie lectus. Donec scelerisque velit in ornare tincidunt. Nullam mollis neque quis ipsum imperdiet lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit diam pellentesque, sollicitudin purus sed, aliquam urna. In accumsan purus vel sapien sodales efficitur. Nullam non tortor eleifend, feugiat mauris egestas, viverra arcu. Curabitur sem massa, convallis eu varius vel, venenatis a turpis. Sed sagittis ligula id elementum euismod. Sed pulvinar accumsan commodo. Nam lorem erat, blandit ut consequat ac, iaculis vitae leo. Duis feugiat efficitur turpis, at ultricies lacus. Integer vehicula tempor vulputate.
        </p>
        <p>
        Cras metus sapien, sagittis non rutrum nec, blandit ac urna. Duis ut convallis erat, non auctor ipsum. Cras ut vehicula sem, eu auctor mi. Suspendisse dui neque, tincidunt at facilisis a, vehicula ac neque. Fusce auctor, urna congue tempor maximus, mauris lectus interdum turpis, a semper leo ex sed dolor. Nullam ut dolor consequat, dapibus mi quis, suscipit enim. Donec rhoncus dignissim urna, et commodo metus volutpat nec. In cursus sem ac dignissim malesuada. Nulla tempor efficitur maximus.
        </p>
        <p>
        In orci velit, maximus sed finibus ut, euismod non ipsum. Nulla facilisi. Proin a luctus tellus, sed dignissim lectus. Etiam eu vehicula ligula. Maecenas eu dolor et ligula eleifend tincidunt. Nulla vitae neque imperdiet, auctor dui vel, mollis ante. Morbi feugiat libero id ipsum facilisis scelerisque. Phasellus luctus non dolor non posuere. Nulla sed orci quam. Vestibulum in mauris a massa varius laoreet at ut tortor. Cras tempor nec turpis in laoreet. Phasellus non mollis eros. In hac habitasse platea dictumst. Integer blandit erat non velit porttitor aliquam. Donec quis felis et justo mattis eleifend. Morbi rhoncus leo nisl, at aliquet nunc fermentum a.
        </p>
        <p>
        Praesent eros sem, convallis vel viverra sit amet, lobortis eu tellus. Donec convallis dolor sed mauris venenatis dapibus. Sed pulvinar augue vitae dui efficitur, non aliquet mi posuere. Phasellus ut mauris sed lorem fringilla ultricies eget et leo. Etiam nisl lorem, porttitor ut nunc vitae, dapibus malesuada eros. Donec porttitor sit amet nisi vitae tempus. Nulla vitae maximus dolor. Vestibulum lacinia erat odio, et finibus libero laoreet sit amet. Mauris lacinia leo et facilisis mollis. Phasellus aliquet, erat a viverra semper, purus nibh auctor turpis, nec sodales sapien erat in sapien.
        </p>', $user, array('lorem', 'ipsum', 'dolor'));
        $post2 = $this->createBlogPost('Example2', '<h1>Title</h1><p>Parahraph paragragph</p>', $adminUser);
        $post3 = $this->createBlogPost('Example3', 'Example example', $adminUser);
        $post4 = $this->createBlogPost('Script content', '<script>alert(\'Breached !!\')', $adminUser);

        $manager->persist($post1);
        $manager->persist($post2);
        $manager->persist($post3);
        $manager->persist($post4);

        $conv1 = $this->createConversation(array($user, $adminUser));
        $conv2 = $this->createConversation(array($user, $bobUser));
        $manager->persist($conv1);
        $manager->persist($conv2);

        $m1 = $this->createMessage($user, $conv1, 'Hi whassup ?');
        $m2 = $this->createMessage($adminUser, $conv1, 'Not much my guy');
        $m3 = $this->createMessage($user, $conv2, 'Hello is someone here ?');

        $manager->persist($m1);
        $manager->persist($m2);
        $manager->persist($m3);
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

    private function createBlogPost($title, $content, $author, $tags=array())
    {
        $post = new BlogPost();
        $post->setTitle($title);
        $post->setContent($content);
        $post->setAuthor($author);
        $post->setPublicationDate(new \DatetimeImmutable('now'));
        $post->setEditDate(new \Datetime('now'));
        $post->setTags($tags);
        return $post;
    }

    private function createConversation($participants)
    {
        $conv = new Conversation();
        foreach($participants as $user) {
            $conv->addParticipant($user);
        }
        return $conv;
    }

    private function createMessage(User $sender, Conversation $destination, $content)
    {
        $msg = new Message();
        $msg->setSender($sender);
        $msg->setDestination($destination);
        $msg->setContent($content);
        return $msg;
    }

}
