const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const tokenGenerator = {
  generate: (length: number): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return (
      Array.from(array, (byte) => characters[byte % characters.length]).join(
        '',
      ) + '=='
    );
  },
};

export { tokenGenerator };
