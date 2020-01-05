import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
  LatLon: any,
};


export type GQLDestination = {
   __typename?: 'Destination',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  endDate?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  tripID?: Maybe<Scalars['String']>,
  todoItems?: Maybe<Array<Maybe<GQLTodoItem>>>,
};

export type GQLDestinationInput = {
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  endDate?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  todoItems?: Maybe<Array<Maybe<GQLTodoItemInput>>>,
  tripID?: Maybe<Scalars['String']>,
};


export type GQLMutation = {
   __typename?: 'Mutation',
  rehydrate?: Maybe<GQLUser>,
  signIn?: Maybe<GQLUser>,
  register?: Maybe<GQLUser>,
  createOrUpdateDestination?: Maybe<GQLDestination>,
  createTrip?: Maybe<GQLTrip>,
  updateTrip?: Maybe<GQLTrip>,
};


export type GQLMutationRehydrateArgs = {
  token?: Maybe<Scalars['String']>
};


export type GQLMutationSignInArgs = {
  user?: Maybe<GQLUserInput>
};


export type GQLMutationRegisterArgs = {
  user?: Maybe<GQLUserInput>
};


export type GQLMutationCreateOrUpdateDestinationArgs = {
  destination?: Maybe<GQLDestinationInput>
};


export type GQLMutationCreateTripArgs = {
  name?: Maybe<Scalars['String']>
};


export type GQLMutationUpdateTripArgs = {
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>
};

export type GQLQuery = {
   __typename?: 'Query',
  getTrips?: Maybe<Array<Maybe<GQLTrip>>>,
  getTrip?: Maybe<GQLTrip>,
  getDestinations?: Maybe<Array<Maybe<GQLDestination>>>,
};


export type GQLQueryGetTripArgs = {
  tripID?: Maybe<Scalars['String']>
};


export type GQLQueryGetDestinationsArgs = {
  tripID?: Maybe<Scalars['String']>
};

export type GQLTodoItem = {
   __typename?: 'TodoItem',
  name?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
};

export type GQLTodoItemInput = {
  name?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
};

export type GQLTrip = {
   __typename?: 'Trip',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  destinations?: Maybe<Array<Maybe<GQLDestination>>>,
};

export type GQLUser = {
   __typename?: 'User',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  jwtToken?: Maybe<Scalars['String']>,
};

export type GQLUserInput = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  jwtToken?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Trip: ResolverTypeWrapper<GQLTrip>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Destination: ResolverTypeWrapper<GQLDestination>,
  TodoItem: ResolverTypeWrapper<GQLTodoItem>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<GQLUser>,
  UserInput: GQLUserInput,
  DestinationInput: GQLDestinationInput,
  TodoItemInput: GQLTodoItemInput,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  LatLon: ResolverTypeWrapper<Scalars['LatLon']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  Trip: GQLTrip,
  String: Scalars['String'],
  Destination: GQLDestination,
  TodoItem: GQLTodoItem,
  Boolean: Scalars['Boolean'],
  Mutation: {},
  User: GQLUser,
  UserInput: GQLUserInput,
  DestinationInput: GQLDestinationInput,
  TodoItemInput: GQLTodoItemInput,
  Date: Scalars['Date'],
  LatLon: Scalars['LatLon'],
};

export interface GQLDateScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Date'], any> {
  name: 'Date'
}

export type GQLDestinationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Destination'] = GQLResolversParentTypes['Destination']> = {
  id?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  tripID?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  todoItems?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['TodoItem']>>>, ParentType, ContextType>,
};

export interface GQLLatLonScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['LatLon'], any> {
  name: 'LatLon'
}

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  rehydrate?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, GQLMutationRehydrateArgs>,
  signIn?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, GQLMutationSignInArgs>,
  register?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, GQLMutationRegisterArgs>,
  createOrUpdateDestination?: Resolver<Maybe<GQLResolversTypes['Destination']>, ParentType, ContextType, GQLMutationCreateOrUpdateDestinationArgs>,
  createTrip?: Resolver<Maybe<GQLResolversTypes['Trip']>, ParentType, ContextType, GQLMutationCreateTripArgs>,
  updateTrip?: Resolver<Maybe<GQLResolversTypes['Trip']>, ParentType, ContextType, GQLMutationUpdateTripArgs>,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  getTrips?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Trip']>>>, ParentType, ContextType>,
  getTrip?: Resolver<Maybe<GQLResolversTypes['Trip']>, ParentType, ContextType, GQLQueryGetTripArgs>,
  getDestinations?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Destination']>>>, ParentType, ContextType, GQLQueryGetDestinationsArgs>,
};

export type GQLTodoItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TodoItem'] = GQLResolversParentTypes['TodoItem']> = {
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  completed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type GQLTripResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Trip'] = GQLResolversParentTypes['Trip']> = {
  id?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  destinations?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Destination']>>>, ParentType, ContextType>,
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  id?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
  jwtToken?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>,
};

export type GQLResolvers<ContextType = any> = {
  Date?: GraphQLScalarType,
  Destination?: GQLDestinationResolvers<ContextType>,
  LatLon?: GraphQLScalarType,
  Mutation?: GQLMutationResolvers<ContextType>,
  Query?: GQLQueryResolvers<ContextType>,
  TodoItem?: GQLTodoItemResolvers<ContextType>,
  Trip?: GQLTripResolvers<ContextType>,
  User?: GQLUserResolvers<ContextType>,
};


