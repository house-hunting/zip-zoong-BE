const Board = require('../middlewares/board');
const Address = require(',,.models/address');


exports.afteruploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}`});
};

exports.uploadBoard = async(req, res) => {
    try {
        const { size, address, pyeong, style, paied, monthPay, deposit, maintenance, moveDate, floor, elevator, parking, options, title, content, img } = req.body;
        
        const room = await Room.create({
            size,
            sido: address.sido,
            gugun: address.gugun,
            dong: address.dong,
            pyeong,
            style,
            paied,
            monthPay,
            deposit,
            maintenance,
            moveDate,
            floor,
            elevator,
            parking,
            options,
            title,
            content,
            img: imgArray,
            UserId: req.user.id,
        });
        const rooms = req.body.content.match(/[^\s]*/g);
        if(rooms) {
            const result = await Promise.all(rooms.map((search) => {
                return Address.findOrCreate({
                    where: { address: search.slice(1).toLowerCase() }
                });
            }));
            console.log(result);
            await room.setAddresses(result.map(r => r[0]));
        }
        await room.save();
        res.status(201).json({ room });
    } catch(error) {
        console.log(error);
        nextPowerTwo(error);
    }
}