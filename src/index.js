import * as LoggerClient from './LoggerClient.js';

global.LoggerClient = LoggerClient;

export const { configure, notify, Notification, retrieve } = LoggerClient;
