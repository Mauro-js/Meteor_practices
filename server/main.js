import { Meteor } from 'meteor/meteor';
import { BrandMongo } from '/imports/api/brand';

const insertBrand = brandText => BrandMongo.insert({ name: brandText });

Meteor.startup(() => {

  if (BrandMongo.find({}).count() === 0) {
    [
      'Coca Cola',
      'NewsPaper',
      'Snacks',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertBrand)
  }

});