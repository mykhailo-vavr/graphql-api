import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { AppContext } from '../context/type';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: number; output: Date; }
  UUID: { input: string; output: string; }
};

export type CreateForumInput = {
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateMessageInput = {
  forumId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type Forum = {
  __typename?: 'Forum';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  messages: Array<Message>;
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['Date']['output'];
  forum: Forum;
  forumId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest?: Maybe<Scalars['Boolean']['output']>;
  createForum: Forum;
  createMessage: Message;
  joinForum: Scalars['Boolean']['output'];
  refuseRequest?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAcceptRequestArgs = {
  requestId: Scalars['UUID']['input'];
};


export type MutationCreateForumArgs = {
  input: CreateForumInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationJoinForumArgs = {
  forumId: Scalars['UUID']['input'];
};


export type MutationRefuseRequestArgs = {
  requestId: Scalars['UUID']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  publicForums: Array<Forum>;
  userRequests: Array<Request>;
};

export type Request = {
  __typename?: 'Request';
  admin: User;
  adminId: Scalars['UUID']['output'];
  forum: Forum;
  forumId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type User = {
  __typename?: 'User';
  forums: Array<Forum>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  pictureUrl: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateForumInput: CreateForumInput;
  CreateMessageInput: CreateMessageInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Forum: ResolverTypeWrapper<Forum>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Request: ResolverTypeWrapper<Request>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateForumInput: CreateForumInput;
  CreateMessageInput: CreateMessageInput;
  Date: Scalars['Date']['output'];
  Forum: Forum;
  Message: Message;
  Mutation: {};
  Query: {};
  Request: Request;
  String: Scalars['String']['output'];
  UUID: Scalars['UUID']['output'];
  User: User;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ForumResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Forum'] = ResolversParentTypes['Forum']> = ResolversObject<{
  admin?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  adminId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  forum?: Resolver<ResolversTypes['Forum'], ParentType, ContextType>;
  forumId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptRequest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAcceptRequestArgs, 'requestId'>>;
  createForum?: Resolver<ResolversTypes['Forum'], ParentType, ContextType, RequireFields<MutationCreateForumArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  joinForum?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationJoinForumArgs, 'forumId'>>;
  refuseRequest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRefuseRequestArgs, 'requestId'>>;
}>;

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  publicForums?: Resolver<Array<ResolversTypes['Forum']>, ParentType, ContextType>;
  userRequests?: Resolver<Array<ResolversTypes['Request']>, ParentType, ContextType>;
}>;

export type RequestResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Request'] = ResolversParentTypes['Request']> = ResolversObject<{
  admin?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  adminId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  forum?: Resolver<ResolversTypes['Forum'], ParentType, ContextType>;
  forumId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  forums?: Resolver<Array<ResolversTypes['Forum']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = AppContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  Forum?: ForumResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Request?: RequestResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

