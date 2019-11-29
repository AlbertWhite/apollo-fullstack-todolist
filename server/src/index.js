"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ApolloServer = require('apollo-server').ApolloServer;
var gql = require('apollo-server').gql;
// schema.js
var typeDefs = gql(__makeTemplateObject(["\n  type Query {\n    users: [User]\n  }\n\n  type Mutation {\n    addUser(name: String!): UserResponse!\n    deleteUser(id: ID!): UserResponse\n    editUser(id: ID!, name: String!): UserResponse!\n  }\n\n  type Item {\n    id: ID!\n    content: String!\n    finished: Boolean!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    items: [Item]\n  }\n\n  type UserResponse{\n    success: Boolean!,\n    users: [User]\n  }\n"], ["\n  type Query {\n    users: [User]\n  }\n\n  type Mutation {\n    addUser(name: String!): UserResponse!\n    deleteUser(id: ID!): UserResponse\n    editUser(id: ID!, name: String!): UserResponse!\n  }\n\n  type Item {\n    id: ID!\n    content: String!\n    finished: Boolean!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    items: [Item]\n  }\n\n  type UserResponse{\n    success: Boolean!,\n    users: [User]\n  }\n"]));
var users = [
    {
        id: 1,
        name: 'albert',
        items: []
    }
];
var resolvers = {
    Query: {
        users: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, users];
            });
        }); }
    },
    Mutation: {
        addUser: function (_, _a) {
            var name = _a.name;
            users.push({
                id: Math.floor(Math.random() * 100),
                name: name,
                items: []
            });
            return { users: users, success: true };
        },
        deleteUser: function (_, _a) {
            var id = _a.id;
            users = users.filter(function (user) { return user.id != id; });
            return { users: users.filter(function (user) { return user.id != id; }), success: true };
        },
        editUser: function (_, _a) {
            var id = _a.id, name = _a.name;
            users = users.map(function (user) { if (user.id == id) {
                return { id: id, name: name, items: [] };
            } return user; });
            return { users: users.map(function (user) { if (user.id == id) {
                    return { id: id, name: name, items: [] };
                } return user; }), success: true };
        }
    }
};
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: function (error) {
        // show error
        console.log(error);
        return error;
    }
});
server.listen({ port: 4000 }).then(function () {
    console.warn('server has been launched');
});
