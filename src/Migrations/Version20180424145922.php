<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180424145922 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX IDX_BA5AE01DF675F31B');
        $this->addSql('CREATE TEMPORARY TABLE __temp__blog_post AS SELECT id, author_id, title, content, publication_date, edit_date FROM blog_post');
        $this->addSql('DROP TABLE blog_post');
        $this->addSql('CREATE TABLE blog_post (id INTEGER NOT NULL, author_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, content CLOB NOT NULL COLLATE BINARY, publication_date DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , edit_date DATETIME DEFAULT NULL, PRIMARY KEY(id), CONSTRAINT FK_BA5AE01DF675F31B FOREIGN KEY (author_id) REFERENCES app_users (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO blog_post (id, author_id, title, content, publication_date, edit_date) SELECT id, author_id, title, content, publication_date, edit_date FROM __temp__blog_post');
        $this->addSql('DROP TABLE __temp__blog_post');
        $this->addSql('CREATE INDEX IDX_BA5AE01DF675F31B ON blog_post (author_id)');
        $this->addSql('ALTER TABLE app_users ADD COLUMN roles CLOB DEFAULT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP INDEX UNIQ_C2502824F85E0677');
        $this->addSql('DROP INDEX UNIQ_C2502824E7927C74');
        $this->addSql('CREATE TEMPORARY TABLE __temp__app_users AS SELECT id, username, password, email, is_active FROM app_users');
        $this->addSql('DROP TABLE app_users');
        $this->addSql('CREATE TABLE app_users (id INTEGER NOT NULL, username VARCHAR(25) NOT NULL, password VARCHAR(64) NOT NULL, email VARCHAR(254) NOT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('INSERT INTO app_users (id, username, password, email, is_active) SELECT id, username, password, email, is_active FROM __temp__app_users');
        $this->addSql('DROP TABLE __temp__app_users');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C2502824F85E0677 ON app_users (username)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C2502824E7927C74 ON app_users (email)');
        $this->addSql('DROP INDEX IDX_BA5AE01DF675F31B');
        $this->addSql('CREATE TEMPORARY TABLE __temp__blog_post AS SELECT id, author_id, title, content, publication_date, edit_date FROM blog_post');
        $this->addSql('DROP TABLE blog_post');
        $this->addSql('CREATE TABLE blog_post (id INTEGER NOT NULL, author_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL, content CLOB NOT NULL, publication_date DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , edit_date DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('INSERT INTO blog_post (id, author_id, title, content, publication_date, edit_date) SELECT id, author_id, title, content, publication_date, edit_date FROM __temp__blog_post');
        $this->addSql('DROP TABLE __temp__blog_post');
        $this->addSql('CREATE INDEX IDX_BA5AE01DF675F31B ON blog_post (author_id)');
    }
}
