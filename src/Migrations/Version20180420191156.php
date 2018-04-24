<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180420191156 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TABLE blog_post (id INTEGER NOT NULL, author_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL, content CLOB NOT NULL, publication_date DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , edit_date DATETIME DEFAULT NULL --(DC2Type:datetime_immutable)
        , PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BA5AE01DF675F31B ON blog_post (author_id)');
        $this->addSql('CREATE TABLE user (id INTEGER NOT NULL, name VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP TABLE blog_post');
        $this->addSql('DROP TABLE user');
    }
}
