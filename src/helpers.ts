export const formatAsDollar = (amount:number)=>{
    return amount.toLocaleString("en-US",{
        style:"currency",
        currency:"USD"
    });
};