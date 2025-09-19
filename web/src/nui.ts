export const fetchNui = <T = any>(eventName: string, data?: any): Promise<T> => {
  return new Promise((resolve) => {
    if (typeof GetParentResourceName === "function") {
      fetch(`https://${GetParentResourceName()}/${eventName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(resolve)
        .catch(() => resolve({} as T));
    } else {
      console.warn("fetchNui chamado fora do ambiente FiveM NUI!");
      resolve({} as T);
    }
  });
};
