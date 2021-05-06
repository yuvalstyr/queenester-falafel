export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthenticatedItem = User;

export type CreateInitialUserInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

/**  A keystone list  */
export type Employee = {
  __typename?: 'Employee';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  salaryPerHour?: Maybe<Scalars['Float']>;
  active?: Maybe<Scalars['String']>;
  shifts: Array<Shift>;
  _shiftsMeta?: Maybe<_QueryMeta>;
};


/**  A keystone list  */
export type EmployeeShiftsArgs = {
  where?: Maybe<ShiftWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortShiftsBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


/**  A keystone list  */
export type Employee_ShiftsMetaArgs = {
  where?: Maybe<ShiftWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortShiftsBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type EmployeeCreateInput = {
  name?: Maybe<Scalars['String']>;
  salaryPerHour?: Maybe<Scalars['Float']>;
  active?: Maybe<Scalars['String']>;
  shifts?: Maybe<ShiftRelateToManyInput>;
};

export type EmployeeRelateToOneInput = {
  create?: Maybe<EmployeeCreateInput>;
  connect?: Maybe<EmployeeWhereUniqueInput>;
  disconnect?: Maybe<EmployeeWhereUniqueInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type EmployeeUpdateInput = {
  name?: Maybe<Scalars['String']>;
  salaryPerHour?: Maybe<Scalars['Float']>;
  active?: Maybe<Scalars['String']>;
  shifts?: Maybe<ShiftRelateToManyInput>;
};

export type EmployeeWhereInput = {
  AND?: Maybe<Array<Maybe<EmployeeWhereInput>>>;
  OR?: Maybe<Array<Maybe<EmployeeWhereInput>>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_i?: Maybe<Scalars['String']>;
  name_not_i?: Maybe<Scalars['String']>;
  name_contains_i?: Maybe<Scalars['String']>;
  name_not_contains_i?: Maybe<Scalars['String']>;
  name_starts_with_i?: Maybe<Scalars['String']>;
  name_not_starts_with_i?: Maybe<Scalars['String']>;
  name_ends_with_i?: Maybe<Scalars['String']>;
  name_not_ends_with_i?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  salaryPerHour?: Maybe<Scalars['Float']>;
  salaryPerHour_not?: Maybe<Scalars['Float']>;
  salaryPerHour_lt?: Maybe<Scalars['Float']>;
  salaryPerHour_lte?: Maybe<Scalars['Float']>;
  salaryPerHour_gt?: Maybe<Scalars['Float']>;
  salaryPerHour_gte?: Maybe<Scalars['Float']>;
  salaryPerHour_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  salaryPerHour_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  active?: Maybe<Scalars['String']>;
  active_not?: Maybe<Scalars['String']>;
  active_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  active_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**  condition must be true for all nodes  */
  shifts_every?: Maybe<ShiftWhereInput>;
  /**  condition must be true for at least 1 node  */
  shifts_some?: Maybe<ShiftWhereInput>;
  /**  condition must be false for all nodes  */
  shifts_none?: Maybe<ShiftWhereInput>;
};

export type EmployeeWhereUniqueInput = {
  id: Scalars['ID'];
};

export type EmployeesCreateInput = {
  data?: Maybe<EmployeeCreateInput>;
};

export type EmployeesUpdateInput = {
  id: Scalars['ID'];
  data?: Maybe<EmployeeUpdateInput>;
};

/**  A keystone list  */
export type Expense = {
  __typename?: 'Expense';
  id: Scalars['ID'];
  date?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
};

export type ExpenseCreateInput = {
  date?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
};

export type ExpenseUpdateInput = {
  date?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
};

export type ExpenseWhereInput = {
  AND?: Maybe<Array<Maybe<ExpenseWhereInput>>>;
  OR?: Maybe<Array<Maybe<ExpenseWhereInput>>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  date?: Maybe<Scalars['String']>;
  date_not?: Maybe<Scalars['String']>;
  date_lt?: Maybe<Scalars['String']>;
  date_lte?: Maybe<Scalars['String']>;
  date_gt?: Maybe<Scalars['String']>;
  date_gte?: Maybe<Scalars['String']>;
  date_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  date_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_i?: Maybe<Scalars['String']>;
  name_not_i?: Maybe<Scalars['String']>;
  name_contains_i?: Maybe<Scalars['String']>;
  name_not_contains_i?: Maybe<Scalars['String']>;
  name_starts_with_i?: Maybe<Scalars['String']>;
  name_not_starts_with_i?: Maybe<Scalars['String']>;
  name_ends_with_i?: Maybe<Scalars['String']>;
  name_not_ends_with_i?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  cost?: Maybe<Scalars['Float']>;
  cost_not?: Maybe<Scalars['Float']>;
  cost_lt?: Maybe<Scalars['Float']>;
  cost_lte?: Maybe<Scalars['Float']>;
  cost_gt?: Maybe<Scalars['Float']>;
  cost_gte?: Maybe<Scalars['Float']>;
  cost_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  cost_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type ExpenseWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ExpensesCreateInput = {
  data?: Maybe<ExpenseCreateInput>;
};

export type ExpensesUpdateInput = {
  id: Scalars['ID'];
  data?: Maybe<ExpenseUpdateInput>;
};


export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  enableSignout: Scalars['Boolean'];
  enableSessionItem: Scalars['Boolean'];
  lists: Array<KeystoneAdminUiListMeta>;
  list?: Maybe<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  path: Scalars['String'];
  label: Scalars['String'];
  isOrderable: Scalars['Boolean'];
  fieldMeta?: Maybe<Scalars['JSON']>;
  viewsIndex: Scalars['Int'];
  customViewsIndex?: Maybe<Scalars['Int']>;
  createView: KeystoneAdminUiFieldMetaCreateView;
  listView: KeystoneAdminUiFieldMetaListView;
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id: Scalars['ID'];
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode: KeystoneAdminUiFieldMetaItemViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Read = 'read',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Read = 'read',
  Hidden = 'hidden'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  key: Scalars['String'];
  itemQueryName: Scalars['String'];
  listQueryName: Scalars['String'];
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  path: Scalars['String'];
  label: Scalars['String'];
  singular: Scalars['String'];
  plural: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  initialColumns: Array<Scalars['String']>;
  pageSize: Scalars['Int'];
  labelField: Scalars['String'];
  fields: Array<KeystoneAdminUiFieldMeta>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  field: Scalars['String'];
  direction: KeystoneAdminUiSortDirection;
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Create a single User item.  */
  createUser?: Maybe<User>;
  /**  Create multiple User items.  */
  createUsers?: Maybe<Array<Maybe<User>>>;
  /**  Update a single User item by ID.  */
  updateUser?: Maybe<User>;
  /**  Update multiple User items by ID.  */
  updateUsers?: Maybe<Array<Maybe<User>>>;
  /**  Delete a single User item by ID.  */
  deleteUser?: Maybe<User>;
  /**  Delete multiple User items by ID.  */
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  /**  Create a single Employee item.  */
  createEmployee?: Maybe<Employee>;
  /**  Create multiple Employee items.  */
  createEmployees?: Maybe<Array<Maybe<Employee>>>;
  /**  Update a single Employee item by ID.  */
  updateEmployee?: Maybe<Employee>;
  /**  Update multiple Employee items by ID.  */
  updateEmployees?: Maybe<Array<Maybe<Employee>>>;
  /**  Delete a single Employee item by ID.  */
  deleteEmployee?: Maybe<Employee>;
  /**  Delete multiple Employee items by ID.  */
  deleteEmployees?: Maybe<Array<Maybe<Employee>>>;
  /**  Create a single Expense item.  */
  createExpense?: Maybe<Expense>;
  /**  Create multiple Expense items.  */
  createExpenses?: Maybe<Array<Maybe<Expense>>>;
  /**  Update a single Expense item by ID.  */
  updateExpense?: Maybe<Expense>;
  /**  Update multiple Expense items by ID.  */
  updateExpenses?: Maybe<Array<Maybe<Expense>>>;
  /**  Delete a single Expense item by ID.  */
  deleteExpense?: Maybe<Expense>;
  /**  Delete multiple Expense items by ID.  */
  deleteExpenses?: Maybe<Array<Maybe<Expense>>>;
  /**  Create a single Shift item.  */
  createShift?: Maybe<Shift>;
  /**  Create multiple Shift items.  */
  createShifts?: Maybe<Array<Maybe<Shift>>>;
  /**  Update a single Shift item by ID.  */
  updateShift?: Maybe<Shift>;
  /**  Update multiple Shift items by ID.  */
  updateShifts?: Maybe<Array<Maybe<Shift>>>;
  /**  Delete a single Shift item by ID.  */
  deleteShift?: Maybe<Shift>;
  /**  Delete multiple Shift items by ID.  */
  deleteShifts?: Maybe<Array<Maybe<Shift>>>;
  authenticateUserWithPassword: UserAuthenticationWithPasswordResult;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  endSession: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserCreateInput>;
};


export type MutationCreateUsersArgs = {
  data?: Maybe<Array<Maybe<UsersCreateInput>>>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data?: Maybe<UserUpdateInput>;
};


export type MutationUpdateUsersArgs = {
  data?: Maybe<Array<Maybe<UsersUpdateInput>>>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};


export type MutationCreateEmployeeArgs = {
  data?: Maybe<EmployeeCreateInput>;
};


export type MutationCreateEmployeesArgs = {
  data?: Maybe<Array<Maybe<EmployeesCreateInput>>>;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['ID'];
  data?: Maybe<EmployeeUpdateInput>;
};


export type MutationUpdateEmployeesArgs = {
  data?: Maybe<Array<Maybe<EmployeesUpdateInput>>>;
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteEmployeesArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};


export type MutationCreateExpenseArgs = {
  data?: Maybe<ExpenseCreateInput>;
};


export type MutationCreateExpensesArgs = {
  data?: Maybe<Array<Maybe<ExpensesCreateInput>>>;
};


export type MutationUpdateExpenseArgs = {
  id: Scalars['ID'];
  data?: Maybe<ExpenseUpdateInput>;
};


export type MutationUpdateExpensesArgs = {
  data?: Maybe<Array<Maybe<ExpensesUpdateInput>>>;
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteExpensesArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};


export type MutationCreateShiftArgs = {
  data?: Maybe<ShiftCreateInput>;
};


export type MutationCreateShiftsArgs = {
  data?: Maybe<Array<Maybe<ShiftsCreateInput>>>;
};


export type MutationUpdateShiftArgs = {
  id: Scalars['ID'];
  data?: Maybe<ShiftUpdateInput>;
};


export type MutationUpdateShiftsArgs = {
  data?: Maybe<Array<Maybe<ShiftsUpdateInput>>>;
};


export type MutationDeleteShiftArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteShiftsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};

export enum PasswordAuthErrorCode {
  Failure = 'FAILURE',
  IdentityNotFound = 'IDENTITY_NOT_FOUND',
  SecretNotSet = 'SECRET_NOT_SET',
  MultipleIdentityMatches = 'MULTIPLE_IDENTITY_MATCHES',
  SecretMismatch = 'SECRET_MISMATCH'
}

export type Query = {
  __typename?: 'Query';
  /**  Search for all User items which match the where clause.  */
  allUsers?: Maybe<Array<Maybe<User>>>;
  /**  Search for the User item with the matching ID.  */
  User?: Maybe<User>;
  /**  Perform a meta-query on all User items which match the where clause.  */
  _allUsersMeta?: Maybe<_QueryMeta>;
  /**  Retrieve the meta-data for the User list.  */
  _UsersMeta?: Maybe<_ListMeta>;
  /**  Search for all Employee items which match the where clause.  */
  allEmployees?: Maybe<Array<Maybe<Employee>>>;
  /**  Search for the Employee item with the matching ID.  */
  Employee?: Maybe<Employee>;
  /**  Perform a meta-query on all Employee items which match the where clause.  */
  _allEmployeesMeta?: Maybe<_QueryMeta>;
  /**  Retrieve the meta-data for the Employee list.  */
  _EmployeesMeta?: Maybe<_ListMeta>;
  /**  Search for all Expense items which match the where clause.  */
  allExpenses?: Maybe<Array<Maybe<Expense>>>;
  /**  Search for the Expense item with the matching ID.  */
  Expense?: Maybe<Expense>;
  /**  Perform a meta-query on all Expense items which match the where clause.  */
  _allExpensesMeta?: Maybe<_QueryMeta>;
  /**  Retrieve the meta-data for the Expense list.  */
  _ExpensesMeta?: Maybe<_ListMeta>;
  /**  Search for all Shift items which match the where clause.  */
  allShifts?: Maybe<Array<Maybe<Shift>>>;
  /**  Search for the Shift item with the matching ID.  */
  Shift?: Maybe<Shift>;
  /**  Perform a meta-query on all Shift items which match the where clause.  */
  _allShiftsMeta?: Maybe<_QueryMeta>;
  /**  Retrieve the meta-data for the Shift list.  */
  _ShiftsMeta?: Maybe<_ListMeta>;
  /**  Retrieve the meta-data for all lists.  */
  _ksListsMeta?: Maybe<Array<Maybe<_ListMeta>>>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  keystone: KeystoneMeta;
};


export type QueryAllUsersArgs = {
  where?: Maybe<UserWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortUsersBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type Query_AllUsersMetaArgs = {
  where?: Maybe<UserWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortUsersBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryAllEmployeesArgs = {
  where?: Maybe<EmployeeWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortEmployeesBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryEmployeeArgs = {
  where: EmployeeWhereUniqueInput;
};


export type Query_AllEmployeesMetaArgs = {
  where?: Maybe<EmployeeWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortEmployeesBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryAllExpensesArgs = {
  where?: Maybe<ExpenseWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortExpensesBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryExpenseArgs = {
  where: ExpenseWhereUniqueInput;
};


export type Query_AllExpensesMetaArgs = {
  where?: Maybe<ExpenseWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortExpensesBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryAllShiftsArgs = {
  where?: Maybe<ShiftWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortShiftsBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryShiftArgs = {
  where: ShiftWhereUniqueInput;
};


export type Query_AllShiftsMetaArgs = {
  where?: Maybe<ShiftWhereInput>;
  search?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Array<SortShiftsBy>>;
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type Query_KsListsMetaArgs = {
  where?: Maybe<_KsListsMetaInput>;
};

/**  A keystone list  */
export type Shift = {
  __typename?: 'Shift';
  id: Scalars['ID'];
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  worker?: Maybe<Employee>;
};

export type ShiftCreateInput = {
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  worker?: Maybe<EmployeeRelateToOneInput>;
};

export type ShiftRelateToManyInput = {
  create?: Maybe<Array<Maybe<ShiftCreateInput>>>;
  connect?: Maybe<Array<Maybe<ShiftWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<ShiftWhereUniqueInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type ShiftUpdateInput = {
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  worker?: Maybe<EmployeeRelateToOneInput>;
};

export type ShiftWhereInput = {
  AND?: Maybe<Array<Maybe<ShiftWhereInput>>>;
  OR?: Maybe<Array<Maybe<ShiftWhereInput>>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  start?: Maybe<Scalars['String']>;
  start_not?: Maybe<Scalars['String']>;
  start_lt?: Maybe<Scalars['String']>;
  start_lte?: Maybe<Scalars['String']>;
  start_gt?: Maybe<Scalars['String']>;
  start_gte?: Maybe<Scalars['String']>;
  start_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  start_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  end_not?: Maybe<Scalars['String']>;
  end_lt?: Maybe<Scalars['String']>;
  end_lte?: Maybe<Scalars['String']>;
  end_gt?: Maybe<Scalars['String']>;
  end_gte?: Maybe<Scalars['String']>;
  end_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  end_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  worker?: Maybe<EmployeeWhereInput>;
  worker_is_null?: Maybe<Scalars['Boolean']>;
};

export type ShiftWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ShiftsCreateInput = {
  data?: Maybe<ShiftCreateInput>;
};

export type ShiftsUpdateInput = {
  id: Scalars['ID'];
  data?: Maybe<ShiftUpdateInput>;
};

export enum SortEmployeesBy {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SalaryPerHourAsc = 'salaryPerHour_ASC',
  SalaryPerHourDesc = 'salaryPerHour_DESC',
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  ShiftsAsc = 'shifts_ASC',
  ShiftsDesc = 'shifts_DESC'
}

export enum SortExpensesBy {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CostAsc = 'cost_ASC',
  CostDesc = 'cost_DESC'
}

export enum SortShiftsBy {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  StartAsc = 'start_ASC',
  StartDesc = 'start_DESC',
  EndAsc = 'end_ASC',
  EndDesc = 'end_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export enum SortUsersBy {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC'
}


/**  A keystone list  */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password_is_set?: Maybe<Scalars['Boolean']>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  code: PasswordAuthErrorCode;
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordSuccess | UserAuthenticationWithPasswordFailure;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  sessionToken: Scalars['String'];
  item: User;
};

export type UserCreateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<Maybe<UserWhereInput>>>;
  OR?: Maybe<Array<Maybe<UserWhereInput>>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  name_i?: Maybe<Scalars['String']>;
  name_not_i?: Maybe<Scalars['String']>;
  name_contains_i?: Maybe<Scalars['String']>;
  name_not_contains_i?: Maybe<Scalars['String']>;
  name_starts_with_i?: Maybe<Scalars['String']>;
  name_not_starts_with_i?: Maybe<Scalars['String']>;
  name_ends_with_i?: Maybe<Scalars['String']>;
  name_not_ends_with_i?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  email_not?: Maybe<Scalars['String']>;
  email_contains?: Maybe<Scalars['String']>;
  email_not_contains?: Maybe<Scalars['String']>;
  email_starts_with?: Maybe<Scalars['String']>;
  email_not_starts_with?: Maybe<Scalars['String']>;
  email_ends_with?: Maybe<Scalars['String']>;
  email_not_ends_with?: Maybe<Scalars['String']>;
  email_i?: Maybe<Scalars['String']>;
  email_not_i?: Maybe<Scalars['String']>;
  email_contains_i?: Maybe<Scalars['String']>;
  email_not_contains_i?: Maybe<Scalars['String']>;
  email_starts_with_i?: Maybe<Scalars['String']>;
  email_not_starts_with_i?: Maybe<Scalars['String']>;
  email_ends_with_i?: Maybe<Scalars['String']>;
  email_not_ends_with_i?: Maybe<Scalars['String']>;
  email_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  email_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  password_is_set?: Maybe<Scalars['Boolean']>;
};

export type UserWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UsersCreateInput = {
  data?: Maybe<UserCreateInput>;
};

export type UsersUpdateInput = {
  id: Scalars['ID'];
  data?: Maybe<UserUpdateInput>;
};

export type _ListAccess = {
  __typename?: '_ListAccess';
  /**
   * Access Control settings for the currently logged in (or anonymous)
   * user when performing 'create' operations.
   * NOTE: 'create' can only return a Boolean.
   * It is not possible to specify a declarative Where clause for this
   * operation
   */
  create?: Maybe<Scalars['Boolean']>;
  /**
   * Access Control settings for the currently logged in (or anonymous)
   * user when performing 'read' operations.
   */
  read?: Maybe<Scalars['JSON']>;
  /**
   * Access Control settings for the currently logged in (or anonymous)
   * user when performing 'update' operations.
   */
  update?: Maybe<Scalars['JSON']>;
  /**
   * Access Control settings for the currently logged in (or anonymous)
   * user when performing 'delete' operations.
   */
  delete?: Maybe<Scalars['JSON']>;
  /**
   * Access Control settings for the currently logged in (or anonymous)
   * user when performing 'auth' operations.
   */
  auth?: Maybe<Scalars['JSON']>;
};

export type _ListInputTypes = {
  __typename?: '_ListInputTypes';
  /** Input type for matching multiple items */
  whereInput?: Maybe<Scalars['String']>;
  /** Input type for matching a unique item */
  whereUniqueInput?: Maybe<Scalars['String']>;
  /** Create mutation input type name */
  createInput?: Maybe<Scalars['String']>;
  /** Create many mutation input type name */
  createManyInput?: Maybe<Scalars['String']>;
  /** Update mutation name input */
  updateInput?: Maybe<Scalars['String']>;
  /** Update many mutation name input */
  updateManyInput?: Maybe<Scalars['String']>;
};

export type _ListMeta = {
  __typename?: '_ListMeta';
  /** The Keystone list key */
  key?: Maybe<Scalars['String']>;
  /**
   * The Keystone List name
   * @deprecated Use `key` instead
   */
  name?: Maybe<Scalars['String']>;
  /** The list's user-facing description */
  description?: Maybe<Scalars['String']>;
  /** The list's display name in the Admin UI */
  label?: Maybe<Scalars['String']>;
  /** The list's singular display name */
  singular?: Maybe<Scalars['String']>;
  /** The list's plural display name */
  plural?: Maybe<Scalars['String']>;
  /** The list's data path */
  path?: Maybe<Scalars['String']>;
  /** Access control configuration for the currently authenticated request */
  access?: Maybe<_ListAccess>;
  /** Information on the generated GraphQL schema */
  schema?: Maybe<_ListSchema>;
};

export type _ListMutations = {
  __typename?: '_ListMutations';
  /** Create mutation name */
  create?: Maybe<Scalars['String']>;
  /** Create many mutation name */
  createMany?: Maybe<Scalars['String']>;
  /** Update mutation name */
  update?: Maybe<Scalars['String']>;
  /** Update many mutation name */
  updateMany?: Maybe<Scalars['String']>;
  /** Delete mutation name */
  delete?: Maybe<Scalars['String']>;
  /** Delete many mutation name */
  deleteMany?: Maybe<Scalars['String']>;
};

export type _ListQueries = {
  __typename?: '_ListQueries';
  /** Single-item query name */
  item?: Maybe<Scalars['String']>;
  /** All-items query name */
  list?: Maybe<Scalars['String']>;
  /** List metadata query name */
  meta?: Maybe<Scalars['String']>;
};

export type _ListSchema = {
  __typename?: '_ListSchema';
  /** The typename as used in GraphQL queries */
  type?: Maybe<Scalars['String']>;
  /**
   * Top level GraphQL query names which either return this type, or
   * provide aggregate information about this type
   */
  queries?: Maybe<_ListQueries>;
  /** Top-level GraphQL mutation names */
  mutations?: Maybe<_ListMutations>;
  /** Top-level GraphQL input types */
  inputTypes?: Maybe<_ListInputTypes>;
  /** Information about fields defined on this list */
  fields?: Maybe<Array<Maybe<_ListSchemaFields>>>;
  /**
   * Information about fields on other types which return this type, or
   * provide aggregate information about this type
   */
  relatedFields?: Maybe<Array<Maybe<_ListSchemaRelatedFields>>>;
};


export type _ListSchemaFieldsArgs = {
  where?: Maybe<_ListSchemaFieldsInput>;
};

export type _ListSchemaFields = {
  __typename?: '_ListSchemaFields';
  /** The path of the field in its list */
  path?: Maybe<Scalars['String']>;
  /**
   * The name of the field in its list
   * @deprecated Use `path` instead
   */
  name?: Maybe<Scalars['String']>;
  /** The field type (ie, Checkbox, Text, etc) */
  type?: Maybe<Scalars['String']>;
};

export type _ListSchemaFieldsInput = {
  type?: Maybe<Scalars['String']>;
};

export type _ListSchemaRelatedFields = {
  __typename?: '_ListSchemaRelatedFields';
  /** The typename as used in GraphQL queries */
  type?: Maybe<Scalars['String']>;
  /** A list of GraphQL field names */
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type _QueryMeta = {
  __typename?: '_QueryMeta';
  count?: Maybe<Scalars['Int']>;
};

export type _KsListsMetaInput = {
  key?: Maybe<Scalars['String']>;
  /** Whether this is an auxiliary helper list */
  auxiliary?: Maybe<Scalars['Boolean']>;
};
