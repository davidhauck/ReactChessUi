export const ChessjsToReactChess = (chessboard) => {
    const fen = chessboard.fen()
    let i = 0;
    const lineup = []
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (fen[i] >= '0' && fen[i] <= '9') {
                c += fen[i] - '0' - 1
            } else if (fen[i] == '/') {
                i++;
                break;
            } else {
                let piece = fen[i] + "@" + String.fromCharCode(c + 97) + (8 - r)
                lineup.push(piece);
            }
            i++;
        }
        if (fen[i] == '/') {
            i++;
        }
    }
    return lineup;
}