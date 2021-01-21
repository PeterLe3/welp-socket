export default class Restaurant {
  name: string;
  votes: number;

  constructor(name: string) {
    this.name = name;
    this.votes = 0;
  }

  updateVote(): void {
    this.votes += 1;
  }
}
