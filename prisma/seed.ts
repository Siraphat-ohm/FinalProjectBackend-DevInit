import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "../src/utils/hash";
const prisma = new PrismaClient();

async function main() {
    const users : Prisma.UserCreateInput[] = [
        {
            id: "1",
            username: "Alice",
            password: hash("12345678"),
            email: "alice@gmail.com"
        },
        {
            id: "2",
            username: "Bob",
            password: hash("45678910"),
            email: "bob@gmail.com"
        },
        {
            id: "3",
            username: "Charlie",
            password: hash("11121314"),
            email: "charline@gmail.com"
        }
    ]

    const todos : Prisma.TodoCreateManyInput[] = [
        {
            title: "Buy milk",
            description: "Buy milk at the supermarket",
            dueDate: new Date(),
            priority: 1,
            status: "DOING",
            userId: "1"
        },
        {
            title: "Buy eggs",
            description: "Buy eggs at the supermarket",
            dueDate: new Date(),
            priority: 2,
            status: "TODO",
            userId: "1"
        },
        {
            title: "Buy bread",
            description: "Buy bread at the supermarket",
            dueDate: new Date(),
            priority: 3,
            status: "DONE",
            userId: "1"
        },
        {
            title: "Buy milk",
            description: "Buy milk at the supermarket",
            dueDate: new Date(),
            priority: 1,
            status: "DOING",
            userId: "2"
        },
        {
            title: "Buy eggs",
            description: "Buy eggs at the supermarket",
            dueDate: new Date(),
            priority: 2,
            status: "TODO",
            userId: "2"
        },
        {
            title: "Buy bread",
            description: "Buy bread at the supermarket",
            dueDate: new Date(),
            priority: 3,
            status: "DONE",
            userId: "2"
        },
        {
            title: "Buy milk",
            description: "Buy milk at the supermarket",
            dueDate: new Date(),
            priority: 1,
            status: "DOING",
            userId: "3"
        },
        {
            title: "Buy eggs",
            description: "Buy eggs at the supermarket",
            dueDate: new Date(),
            priority: 2,
            status: "TODO",
            userId: "3"
        },
        {
            title: "Buy bread",
            description: "Buy bread at the supermarket",
            dueDate: new Date(),
            priority: 3,
            status: "DONE",
            userId: "3"
        }
    ]

    const events : Prisma.CalendarEventCreateManyInput[] = [
        {
            title: "Event 1",
            description: "Event 1 description",
            startDate: new Date("12-12-2020"),
            endDate: new Date("12-12-2021"),
            userId: "1"
        },
        {
            title: "Event 2",
            description: "Event 2 description",
            startDate: new Date("12-12-2010"),
            endDate: new Date("12-10-2012"),
            userId: "1"
        },
        {
            title: "Event 3",
            description: "Event 3 description",
            startDate: new Date("12-09-2012"),
            endDate: new Date("12-11-2019"),
            userId: "1"
        },
        {
            title: "Event 4",
            description: "Event 4 description",
            startDate: new Date("12-01-2018"),
            endDate: new Date("12-12-2019"),
            userId: "2"
        },
        {
            title: "Event 5",
            description: "Event 7 description",
            startDate: new Date("12-12-2020"),
            endDate: new Date("12-12-2021"),
            userId: "3"
        },
    ]

    const dailyLogs : Prisma.DailyCreateManyInput[] = [
        {
            content: "Daily log 1",
            userId: "1",
            date: new Date("2022-11-31")
        },
        {
            content: "Daily log 2",
            userId: "1",
            date: new Date("2022-11-31")
        },
        {
            content: "Daily log 3",
            userId: "1",
            date: new Date("2022-11-31")
        },
        {
            content: "Daily log 4",
            userId: "2",
            date: new Date("2022-11-31")
        },
        {
            content: "Daily log 5",
            userId: "3",
            date: new Date("2022-11-31")
        },
    ]

    await prisma.user.createMany({ 
        data: users
    });

    await prisma.todo.createMany({
        data: todos
    });

    await prisma.calendarEvent.createMany({
        data: events
    });

    await prisma.daily.createMany({
        data: dailyLogs
    });

}

main();