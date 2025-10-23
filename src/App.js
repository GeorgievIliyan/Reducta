import Modal from './components/Modal';
import ToDigits from './components/ToDigits';
import ToNumber from './components/ToNumber';

function App() {

    //🟪 digits => number
    function calcNumber(number) {
        let z = null;
        let flipped = false;

        let temp = String(number);
        if (temp.length !== 6) {
            return "Error! Number must be six digits!";
        }

        const actions = [];
        while (temp.length > 1) {
            const summed = String(Number(temp[0]) + Number(temp[1]));
            temp = summed + temp.slice(2);
            actions.push(temp);
        }
        const x = temp;

        let y;
        if (actions.length) {
            y = actions[actions.length - 2];
            if (Number(y) > 30) {
                y = y.split("").reverse().join("");
                flipped = true;
            }
        }

        if (Number(y) > 28) {
            y = `${y} - exception from the rule`;
        }

        if (Number(actions[actions.length - 3]) <= 28) {
            z = actions[actions.length - 3];
        }

        if (flipped) {
            if (z) {
                return `${x}, ${y} - flipped, ${z}`;
            } else {
                return `${x}, ${y} - flipped`;
            }
        } else {
            if (z) {
                return `${x}, ${y}, ${z}`;
            } else {
                return `${x}, ${y}`;
            }
        }
    }
    // 🟪 number => digits
    function reverseCode(studentNum) {
        const target = parseInt(studentNum, 10);
        if (isNaN(target)) {
            return "❌ Enter a valid student number (1–30)";
        }

        if (target < 1 || target > 30) {
            return "❌ Enter a valid student number (1–30)";
        }

        // Compute digital root
        const digitalRoot = (n) => {
            while (n > 9) {
                n = String(n)
                    .split("")
                    .reduce((a, b) => a + Number(b), 0);
            }
            return n;
        };

        const root = digitalRoot(target);

        // Try random 6-digit numbers
        for (let i = 0; i < 10000; i++) {
            const candidate = Math.floor(Math.random() * 900000) + 100000;
            if (digitalRoot(candidate) === root) {
                return candidate;
            }
        }

        return "⚠️ Couldn't find code (try again)";
    }

    return (
        <div className="App">
            <Modal />
            <ToDigits />
            <ToNumber />
        </div>
    );
}

export default App;