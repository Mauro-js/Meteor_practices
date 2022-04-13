import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { BrandMongo } from '/imports/api/brand';

const insertBrand = (brandText, user) =>
  BrandMongo.insert({
    name: brandText,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (BrandMongo.find({}).count() === 0) {
    [
      'Coca Cola',
      'NewsPaper',
      'Snacks',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(brandText => insertBrand(brandText, user));
  }

});