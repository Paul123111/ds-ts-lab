import {Friend, Colleague, EmailContact } from './myTypes'
import {friends, colleagues} from './01-basics'

function older(f: Friend) : string {
  f.age += 1
  return `${f.name} is now ${f.age}` 
}

//console.log(older(friends[0]))

// Increment the age of an array of friends
function allOlder(friends: Friend[]) : string[] {
  let list: string[] = new Array(friends.length)
  let count: number = 0
  friends.forEach( (f) => {
    f.age += 1
    list[count]=`${f.name} is now ${f.age}`
    count++
  });
  return list
}
//console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) { // Inferred retun type
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
//console.log(highestExtension(colleagues.current));

function addColleague(cs: Colleague[], name: string, department: string, email: string) : void {
  const newColleague: Colleague = {
    name: name,
    department: department,
    contact: {
      email: email,
      extension: highestExtension(cs).contact.extension+1,
    },
  };
  cs.push(newColleague)
}

//addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
//console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));

function findFriends(
  friends: Friend[],
  finder: (f: Friend) => boolean
): string[] {
  const found = friends.filter(finder); // Friend[] inferred
  const result: string[] = found.map((f) => f.name);
  return result
}

//console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
//console.log(findFriends(friends, (friend) => friend.age < 35));
