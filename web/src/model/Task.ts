

export default class Task {
    id: number;
    title: string;
    description: string;
    persona: string;
    group: number;
    completed: boolean;
    status:"todo"|"progress"|"completed";
  
    constructor(id: number, title: string, description: string, persona: string, group: number, completed: boolean = false,status: "todo" | "progress" | "completed") {
      this.id = id;
      this.title = title;
      this.description = description;
      this.persona = persona;
      this.group = group;
      this.completed = completed;
      this.status=status;
    }
  }
  