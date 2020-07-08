import Jasmine from 'jasmine';

const jasmine = new Jasmine();
jasmine.loadConfigFile('jasmine_test/spec/support/jasmine.json');
jasmine.execute();