import type {
  IBudget,
  IProjectedExpense,
  IProjectedIncome,
  ITransaction,
} from '@interfaces/budget';
import type { IUser } from '@interfaces/user';

export default () => {
  const getProjectedIncome = async (
    username: string
  ): Promise<IProjectedIncome[]> => {
    // Get the data from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, return an empty array.
    if (!item) return [];

    // Parse the item into an array of IUser objects.
    const users: IUser[] = JSON.parse(item) as unknown as IUser[];

    // Find the user with the matching username.
    const user: IUser | undefined = users.find(
      (user: IUser) => user.username === username
    );

    // If the user is undefined, return an empty array.
    if (user === undefined) return [];

    // Return the projected income for the user.
    return user.budget.credits;
  };

  const getProjectedExpenses = async (
    username: string
  ): Promise<IProjectedExpense[]> => {
    // Get the data from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, return an empty array.
    if (!item) return [];

    // Parse the item into an array of IUser objects.
    const users: IUser[] = JSON.parse(item) as unknown as IUser[];

    // Find the user with the matching username.
    const user: IUser | undefined = users.find(
      (user: IUser) => user.username === username
    );

    // If the user is undefined, return an empty array.
    if (user === undefined) return [];

    // Return the projected expenses for the user.
    return user.budget.debits;
  };

  const getTransactions = async (username: string): Promise<ITransaction[]> => {
    // Get the data from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, return an empty array.
    if (!item) return [];

    // Parse the item into an array of IUser objects.
    const users: IUser[] = JSON.parse(item) as unknown as IUser[];

    // Find the user with the matching username.
    const user: IUser | undefined = users.find(
      (user: IUser) => user.username === username
    );

    // If the user is undefined, return an empty array.
    if (user === undefined) return [];

    // Return the transactions for the user.
    return user.budget.transactions;
  };

  const getBudget = async (username: string): Promise<IBudget> => {
    // Create a promise to return the budget.
    const [income, expenses, transactions] = await Promise.all([
      getProjectedIncome(username),
      getProjectedExpenses(username),
      getTransactions(username),
    ]);

    // Return the budget.
    return {
      income,
      expenses,
      transactions,
    };
  };

  const setProjectedIncome = async (
    username: string,
    income: IProjectedIncome[]
  ): Promise<void> => {
    // Create an variable to hold the users array.
    let users: IUser[] = [];

    // Get the user object from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, create an empty object.
    if (item) {
      // Parse the item into an array of IUser objects.
      users = JSON.parse(item) as unknown as IUser[];
    } else {
      localStorage.setItem(`users`, JSON.stringify([]));
    }

    // Find the index of the user with the matching username.
    const userIndex: number = users.findIndex(
      (user: IUser) => user.username === username
    );

    // If the user is -1 (does not exist), create a new user.
    if (userIndex === -1) {
      users.push({
        username,
        budget: {
          income,
          expenses: [],
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.credits = income;
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const setProjectedExpenses = async (
    username: string,
    expenses: IProjectedExpense[]
  ): Promise<void> => {
    // Create an variable to hold the users array.
    let users: IUser[] = [];

    // Get the user object from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, create an empty object.
    if (item) {
      // Parse the item into an array of IUser objects.
      users = JSON.parse(item) as unknown as IUser[];
    } else {
      localStorage.setItem(`users`, JSON.stringify([]));
    }

    // Find the index of the user with the matching username.
    const userIndex: number = users.findIndex(
      (user: IUser) => user.username === username
    );

    // If the user is -1 (does not exist), create a new user.
    if (userIndex === -1) {
      users.push({
        username,
        budget: {
          income: [],
          expenses,
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.debits = expenses;
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const setTransactions = async (
    username: string,
    transactions: ITransaction[]
  ): Promise<void> => {
    // Create an variable to hold the users array.
    let users: IUser[] = [];

    // Get the user object from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, create an empty object.
    if (item) {
      // Parse the item into an array of IUser objects.
      users = JSON.parse(item) as unknown as IUser[];
    } else {
      localStorage.setItem(`users`, JSON.stringify([]));
    }

    // Find the index of the user with the matching username.
    const userIndex: number = users.findIndex(
      (user: IUser) => user.username === username
    );

    // If the user is -1 (does not exist), create a new user.
    if (userIndex === -1) {
      users.push({
        username,
        budget: {
          income: [],
          expenses: [],
          transactions,
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.transactions = transactions;
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const setBudget = async (
    username: string,
    budget: IBudget
  ): Promise<void> => {
    // Create a promise to return the budget.
    await Promise.all([
      setProjectedIncome(username, budget.credits),
      setProjectedExpenses(username, budget.debits),
      setTransactions(username, budget.transactions),
    ]);
  };

  const addProjectedIncome = async (
    username: string,
    income: IProjectedIncome
  ): Promise<void> => {
    // Create an variable to hold the users array.
    let users: IUser[] = [];

    // Get the user object from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, create an empty object.
    if (item) {
      // Parse the item into an array of IUser objects.
      users = JSON.parse(item) as unknown as IUser[];
    } else {
      localStorage.setItem(`users`, JSON.stringify([]));
    }

    // Find the index of the user with the matching username.
    const userIndex: number = users.findIndex(
      (user: IUser) => user.username === username
    );

    // If the user is -1 (does not exist), create a new user.
    if (userIndex === -1) {
      users.push({
        username,
        budget: {
          income: [income],
          expenses: [],
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.credits.push(income);
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const addProjectedExpense = async (
    username: string,
    expense: IProjectedExpense
  ): Promise<void> => {
    // Create an variable to hold the users array.
    let users: IUser[] = [];

    // Get the user object from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, create an empty object.
    if (item) {
      // Parse the item into an array of IUser objects.
      users = JSON.parse(item) as unknown as IUser[];
    } else {
      localStorage.setItem(`users`, JSON.stringify([]));
    }

    // Find the index of the user with the matching username.
    const userIndex: number = users.findIndex(
      (user: IUser) => user.username === username
    );

    // If the user is -1 (does not exist), create a new user.
    if (userIndex === -1) {
      users.push({
        username,
        budget: {
          income: [],
          expenses: [expense],
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.debits.push(expense);
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const addTransaction = async (
    username: string,
    transaction: ITransaction
  ): Promise<void> => {
    // Create an variable to hold the users array.
    let users: IUser[] = [];

    // Get the user object from the store (local storage).
    // eslint-disable-next-line @typescript-eslint/ban-types
    const item: string | null = localStorage.getItem(`users`);

    // If the item is null, create an empty object.
    if (item) {
      // Parse the item into an array of IUser objects.
      users = JSON.parse(item) as unknown as IUser[];
    } else {
      localStorage.setItem(`users`, JSON.stringify([]));
    }

    // Find the index of the user with the matching username.
    const userIndex: number = users.findIndex(
      (user: IUser) => user.username === username
    );

    // If the user is -1 (does not exist), create a new user.
    if (userIndex === -1) {
      users.push({
        username,
        budget: {
          income: [],
          expenses: [],
          transactions: [transaction],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.transactions.push(transaction);
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  return {
    getProjectedIncome,
    getProjectedExpenses,
    getTransactions,
    getBudget,
    setProjectedIncome,
    setProjectedExpenses,
    setTransactions,
    setBudget,
    addProjectedIncome,
    addProjectedExpense,
    addTransaction,
  };
};
