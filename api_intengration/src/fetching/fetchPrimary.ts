interface JSONtype {
  id: number;
  userId: number;
  body: string;
  title: string;
}

async function fetchingData(): Promise<void> {
  try {
    const URL: string = "https://jsonplaceholder.typicode.com/posts/1";
    const response: Response = await fetch(URL);
    const result: JSONtype[] = await response.json();
    console.log(result);
  } catch (error: unknown) {
    console.log("Common Error:", error);
  }
}

export default fetchingData;
