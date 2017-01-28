import * as chai from "chai";
import * as mocha from "mocha";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import * as Formatter from "../../src/formatter/index";
import * as Uml from "../../src/index";

const expect = chai.expect;
chai.use(sinonChai);

describe("YumlFormatter", () => {
    let sandbox: sinon.SinonSandbox;
    let cut: Formatter.YumlFormatter;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        cut = new Formatter.YumlFormatter();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe("#generateClassDiagram", () => {
        let returnValue: string;
        let umlProgram: Uml.Program;
        beforeEach(() => {
            umlProgram = new Uml.Program();
        });

        const executeCut = () => {
            returnValue = cut.generateClassDiagram(umlProgram);
        };

        it("should handle empty uml program", () => {
            expect(executeCut()).to.not.throw;
            expect(returnValue).to.be.string("");
        });

        it("should handle uml program with unassociated classes", () => {
            const foo = new Uml.Class();
            foo.name = "Foo";
            umlProgram.classes.setValue(foo.name, foo);
            const bar = new Uml.Class();
            bar.name = "Bar";
            umlProgram.classes.setValue(bar.name, bar);
            expect(executeCut()).to.not.throw;
            expect(returnValue).to.match(/^\/\/\s*{type:class}\s*$/m);
            expect(returnValue).to.match(/^\[Foo\]\s*$/m);
            expect(returnValue).to.match(/^\[Bar\]\s*$/m);
        });
    });
});
