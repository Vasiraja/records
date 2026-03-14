// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html

import { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers'
import { Application as FeathersApplication } from '@feathersjs/koa'
import { ApplicationConfiguration } from './configuration'

import { User } from './services/users/users'

export type { NextFunction }

// The types for app.get(name) and app.set(name)
export interface Configuration extends ApplicationConfiguration {}

// Mapping of service names to types
export interface ServiceTypes {}

// Application instance type
export type Application = FeathersApplication<ServiceTypes, Configuration>

// Hook context type
export type HookContext<S = any> = FeathersHookContext<Application, S>

// Add authenticated user to params
declare module '@feathersjs/feathers' {
  interface Params {
    user?: User
  }
}