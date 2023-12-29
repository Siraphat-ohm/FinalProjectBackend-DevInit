import { PrismaClient } from "@prisma/client";
import { ApiError } from "./ApiError";

const handleDatabaseError = async( model:any, query:any, args:any ) => {
    try {
        return await query(args);
    } catch (error: any) {
        console.log(error.code)
        if ( error.code == 'P2025' || error.code == 'P2003' ) {
            throw new ApiError( `${model} Not Found.`, 404 );
        };
        throw error;
    }
}

const prisma = (new PrismaClient()).$extends({
    query: {
        $allModels: {
            async findFirstOrThrow({ model, query, args }){
                return await handleDatabaseError( model, query, args );
            },
            async findUniqueOrThrow({ model, query, args }){
                args = { ...args }
                return await handleDatabaseError( model, query, args );
            },
            async createMany( { model, query, args }) {
                return await handleDatabaseError( model, query, args );
            },
        },
    }
});

export default prisma;