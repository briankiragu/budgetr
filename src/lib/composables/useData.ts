import type {
  IBudget,
  IProjectedDebit,
  IProjectedCredit,
  ITransaction,
} from '@interfaces/budget';
import type { IUser } from '@interfaces/user';

export default () => {
  const getProjectedCredits = async (
    username: string
  ): Promise<IProjectedCredit[]> => {
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

    // Return the projected credits for the user.
    return user.budget.credits;
  };

  const getProjectedDebits = async (
    username: string
  ): Promise<IProjectedDebit[]> => {
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

    // Return the projected debits for the user.
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
    const [credits, debits, transactions] = await Promise.all([
      getProjectedCredits(username),
      getProjectedDebits(username),
      getTransactions(username),
    ]);

    // Return the budget.
    return {
      credits,
      debits,
      transactions,
    };
  };

  const setProjectedCredits = async (
    username: string,
    credits: IProjectedCredit[]
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
        config: {
          natures: { credit: [], debit: [] },
        },
        budget: {
          credits,
          debits: [],
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.credits = credits;
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const setProjectedDebits = async (
    username: string,
    debits: IProjectedDebit[]
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
        config: {
          natures: { credit: [], debit: [] },
        },
        budget: {
          credits: [],
          debits,
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.debits = debits;
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
        config: {
          natures: { credit: [], debit: [] },
        },
        budget: {
          credits: [],
          debits: [],
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
      setProjectedCredits(username, budget.credits),
      setProjectedDebits(username, budget.debits),
      setTransactions(username, budget.transactions),
    ]);
  };

  const addProjectedCredit = async (
    username: string,
    credits: IProjectedCredit
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
        config: {
          natures: { credit: [], debit: [] },
        },
        budget: {
          credits: [credits],
          debits: [],
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.credits.push(credits);
    }

    // Save the users array to the store (local storage).
    localStorage.setItem(`users`, JSON.stringify(users));
  };

  const addProjectedDebit = async (
    username: string,
    debit: IProjectedDebit
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
        config: {
          natures: { credit: [], debit: [] },
        },
        budget: {
          credits: [],
          debits: [debit],
          transactions: [],
        },
      });
    } else {
      // Update the user's budget in the users array.
      users[userIndex].budget.debits.push(debit);
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
        config: {
          natures: { credit: [], debit: [] },
        },
        budget: {
          credits: [],
          debits: [],
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
    getProjectedCredits,
    getProjectedDebits,
    getTransactions,
    getBudget,
    setProjectedCredits,
    setProjectedDebits,
    setTransactions,
    setBudget,
    addProjectedCredit,
    addProjectedDebit,
    addTransaction,
  };
};
