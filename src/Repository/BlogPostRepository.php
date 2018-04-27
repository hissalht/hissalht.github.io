<?php

namespace App\Repository;

use App\Entity\BlogPost;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method BlogPost|null find($id, $lockMode = null, $lockVersion = null)
 * @method BlogPost|null findOneBy(array $criteria, array $orderBy = null)
 * @method BlogPost[]    findAll()
 * @method BlogPost[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BlogPostRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BlogPost::class);
    }

    public function getFirstPost()
    {
        return $this->createQueryBuilder('p')
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * @return BlogPost Returns the most recent blog post.
     */
    public function getLastPost()
    {
        return $this->createQueryBuilder('p')
            ->orderBy('p.publication_date', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * @return BlogPost Returns the previous post by id.
     */
    public function getPreviousPost(BlogPost $actual)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.id = :target_id')
            ->setParameter('target_id', $actual->getId() - 1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
     * @return BlogPost Returns the next post by id.
     */
    public function getNextPost(BlogPost $actual)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.id = :target_id')
            ->setParameter('target_id', $actual->getId() + 1)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

//    /**
//     * @return BlogPost[] Returns an array of BlogPost objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BlogPost
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
