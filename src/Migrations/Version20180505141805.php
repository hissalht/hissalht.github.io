<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180505141805 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TABLE conversation (id INTEGER NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE conversation_user (conversation_id INTEGER NOT NULL, user_id INTEGER NOT NULL, PRIMARY KEY(conversation_id, user_id))');
        $this->addSql('CREATE INDEX IDX_5AECB5559AC0396 ON conversation_user (conversation_id)');
        $this->addSql('CREATE INDEX IDX_5AECB555A76ED395 ON conversation_user (user_id)');
        $this->addSql('DROP INDEX IDX_BA5AE01DF675F31B');
        $this->addSql('CREATE TEMPORARY TABLE __temp__blog_post AS SELECT id, author_id, title, content, publication_date, edit_date, tags FROM blog_post');
        $this->addSql('DROP TABLE blog_post');
        $this->addSql('CREATE TABLE blog_post (id INTEGER NOT NULL, author_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, content CLOB NOT NULL COLLATE BINARY, publication_date DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , edit_date DATETIME DEFAULT NULL, tags CLOB DEFAULT NULL COLLATE BINARY --(DC2Type:array)
        , PRIMARY KEY(id), CONSTRAINT FK_BA5AE01DF675F31B FOREIGN KEY (author_id) REFERENCES app_users (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO blog_post (id, author_id, title, content, publication_date, edit_date, tags) SELECT id, author_id, title, content, publication_date, edit_date, tags FROM __temp__blog_post');
        $this->addSql('DROP TABLE __temp__blog_post');
        $this->addSql('CREATE INDEX IDX_BA5AE01DF675F31B ON blog_post (author_id)');
        $this->addSql('DROP INDEX IDX_B6BD307FF624B39D');
        $this->addSql('DROP INDEX IDX_B6BD307FCD53EDB6');
        $this->addSql('CREATE TEMPORARY TABLE __temp__message AS SELECT id, receiver_id, sender_id FROM message');
        $this->addSql('DROP TABLE message');
        $this->addSql('CREATE TABLE message (id INTEGER NOT NULL, sender_id INTEGER NOT NULL, destination_id INTEGER NOT NULL, content CLOB NOT NULL, PRIMARY KEY(id), CONSTRAINT FK_B6BD307FF624B39D FOREIGN KEY (sender_id) REFERENCES app_users (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_B6BD307F816C6140 FOREIGN KEY (destination_id) REFERENCES conversation (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO message (id, destination_id, sender_id) SELECT id, receiver_id, sender_id FROM __temp__message');
        $this->addSql('DROP TABLE __temp__message');
        $this->addSql('CREATE INDEX IDX_B6BD307FF624B39D ON message (sender_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F816C6140 ON message (destination_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP TABLE conversation');
        $this->addSql('DROP TABLE conversation_user');
        $this->addSql('DROP INDEX IDX_BA5AE01DF675F31B');
        $this->addSql('CREATE TEMPORARY TABLE __temp__blog_post AS SELECT id, author_id, title, content, publication_date, edit_date, tags FROM blog_post');
        $this->addSql('DROP TABLE blog_post');
        $this->addSql('CREATE TABLE blog_post (id INTEGER NOT NULL, author_id INTEGER NOT NULL, title VARCHAR(255) NOT NULL, content CLOB NOT NULL, publication_date DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , edit_date DATETIME DEFAULT NULL, tags CLOB DEFAULT NULL --(DC2Type:array)
        , PRIMARY KEY(id))');
        $this->addSql('INSERT INTO blog_post (id, author_id, title, content, publication_date, edit_date, tags) SELECT id, author_id, title, content, publication_date, edit_date, tags FROM __temp__blog_post');
        $this->addSql('DROP TABLE __temp__blog_post');
        $this->addSql('CREATE INDEX IDX_BA5AE01DF675F31B ON blog_post (author_id)');
        $this->addSql('DROP INDEX IDX_B6BD307FF624B39D');
        $this->addSql('DROP INDEX IDX_B6BD307F816C6140');
        $this->addSql('CREATE TEMPORARY TABLE __temp__message AS SELECT id, sender_id, destination_id FROM message');
        $this->addSql('DROP TABLE message');
        $this->addSql('CREATE TABLE message (id INTEGER NOT NULL, receiver_id INTEGER NOT NULL, sender_id INTEGER NOT NULL, PRIMARY KEY(id), CONSTRAINT FK_B6BD307F816C6140 FOREIGN KEY (receiver_id) REFERENCES conversation (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO message (id, sender_id, receiver_id) SELECT id, sender_id, destination_id FROM __temp__message');
        $this->addSql('DROP TABLE __temp__message');
        $this->addSql('CREATE INDEX IDX_B6BD307FF624B39D ON message (sender_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307FCD53EDB6 ON message (receiver_id)');
    }
}
