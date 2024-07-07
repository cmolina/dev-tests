import { Migration } from '@mikro-orm/migrations';

export class Migration20240707033232 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `fruit` (`id` integer not null primary key autoincrement, `name` text not null);');
  }

}
