const graphql = require("graphql");
const Company = require("../models/company");
const Event = require("../models/event");
const graphqlISO = require("graphql-iso-date");

const {
  GraphQLDate, // ex: 1991-12-24
  GraphQLTime, // ex: '14:30:00.000Z'
  GraphQLDateTime // ex: '2017-01-10T21:33:15.233Z'
} = graphqlISO;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const EventType = new GraphQLObjectType ({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    eventName: { type: GraphQLString },
    dateFrom: { type: GraphQLDate },
    dateEnd: { type: GraphQLDate },
    //address: { type: GraphQLString },
    description: { type: GraphQLString },
    companies: {
      type: CompanyType,
      resolve(parent, args) {
        return Company.findById(parent.companyID);
      }
    }
  })
});

const CompanyType = new GraphQLObjectType ({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    location: { type: GraphQLString },
    numberOfStaff: { type: GraphQLInt },
    establishYear: { type: GraphQLInt },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({ companyID: parent.id });
      }
    }
  })
});

const Mutation = new GraphQLObjectType ({
  name: "Mutation",
  description: 'These are the things we can change',
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        companyName: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        numberOfStaff: { type: new GraphQLNonNull(GraphQLInt) },
        establishYear: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let newCompany = new Company ({
          companyName: args.companyName,
          location: args.location,
          numberOfStaff: args.numberOfStaff,
          establishYear: args.establishYear,
        });
        return newCompany.save();
      }
    },
    // xem xet lai co can doi ten giong ben client hay khong. AddEvent hay addEvent
    addEvent: {
      type: EventType,
      args: {
        eventName: { type: new GraphQLNonNull(GraphQLString) },
        dateFrom: { type: new GraphQLNonNull(GraphQLDate) },
        dateEnd: { type: new GraphQLNonNull(GraphQLDate) },
        //address: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        companyID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newEvent = new Event ({
          eventName: args.eventName,
          dateFrom: args.dateFrom,
          dateEnd: args.dateEnd,
          //address: args.address,
          description: args.description,
          companyID: args.companyID,
        });
        return newEvent.save();
      }
    },

    updateEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        eventName: { type: GraphQLString },
        dateFrom: { type: GraphQLDate },
        dateEnd: { type: GraphQLDate },
        //address: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Event.update(
          { "_id" : args.id },
          {
            eventName : args.eventName ? args.eventName : "",
            dateFrom : args.dateFrom ? args.dateFrom : "",
            dateEnd : args.dateEnd ? args.dateEnd : "",
            description : args.description ? args.description : ""
          },
          { upsert: true }
        );
      }
    },

    deleteEvent: {
      type: EventType,
      description: 'Delete an event with id and return the event that was deleted.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (value, { id }) => {
        console.log("try to delete event with id:",id)
        return Event.deleteOne({ "_id": id });
      }
    }
  }
});

const RootQuery = new GraphQLObjectType ({
  name: "RootQueryType",
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
          return Event.findById(args.id);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Company.findById(args.id);
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
          return Event.find({});
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
          return Company.find({});
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery,
  mutation: Mutation
});