//table
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { Runners } from './runners.js';

  new Tabular.Table({
    name: "Runners",
    collection: Runners,

    columns: [
      { data: "firstName", title: "Vorname" },
      { data: "lastName", title: "Nachname" },
      { data: "club", title: "Verein" },
      { data: "group", title: "Altersklasse" }
    ],
    paging: false,
    scrollY: "100%",
    searching: false,
    info: false,
    ordering: false
  });
  //https://www.datatables.net/manual/options

