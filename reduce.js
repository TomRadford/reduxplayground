import fs from 'fs'

let items = fs.readFileSync('items.txt', 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.split('\t'))
    .reduce((customers, line) => {
        customers[line[0]] = customers[line[0]] || []
        customers[line[0]].push(
            {
                name: line[1],
                price: line[2],
                qty: line[3]
            })
        
        return customers
    } , {})

console.log(JSON.stringify(items, null, 2))