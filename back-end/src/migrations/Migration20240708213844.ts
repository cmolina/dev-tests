import { Migration } from '@mikro-orm/migrations';

export class Migration20240708213844 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `client` (`id` integer not null primary key autoincrement, `first_name` text not null, `last_name` text not null, `email` text not null);');
    this.addSql('create unique index `client_email_unique` on `client` (`email`);');

    this.addSql('create table `farmer` (`id` integer not null primary key autoincrement, `first_name` text not null, `last_name` text not null, `email` text not null);');
    this.addSql('create unique index `farmer_email_unique` on `farmer` (`email`);');

    this.addSql('create table `field` (`id` integer not null primary key autoincrement, `name` text not null, `location` text not null, `farmer_id` integer not null, constraint `field_farmer_id_foreign` foreign key(`farmer_id`) references `farmer`(`id`) on update cascade);');
    this.addSql('create index `field_farmer_id_index` on `field` (`farmer_id`);');
    this.addSql('create unique index `field_name_location_unique` on `field` (`name`, `location`);');

    this.addSql('create table `crop` (`id` integer not null primary key autoincrement, `client_id` integer not null, `fruit_id` integer not null, `field_id` integer not null, constraint `crop_client_id_foreign` foreign key(`client_id`) references `client`(`id`) on update cascade, constraint `crop_fruit_id_foreign` foreign key(`fruit_id`) references `fruit`(`id`) on update cascade, constraint `crop_field_id_foreign` foreign key(`field_id`) references `field`(`id`) on update cascade);');
    this.addSql('create index `crop_client_id_index` on `crop` (`client_id`);');
    this.addSql('create index `crop_fruit_id_index` on `crop` (`fruit_id`);');
    this.addSql('create index `crop_field_id_index` on `crop` (`field_id`);');

    this.addSql('alter table `fruit` add column `variety` text not null;');
    this.addSql('create unique index `fruit_name_variety_unique` on `fruit` (`name`, `variety`);');
  }

}
