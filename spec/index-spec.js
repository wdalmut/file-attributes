const kv = require('../');
const mock = require('mock-fs');

describe("FileAttributes", function() {
  describe("Set", () => {

    beforeEach(() => {
      mock({
        "/path/to/disk": {
        },
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it("should persist on disk", function(done) {

      var a = kv("/path/to/disk");

      a.set("/hello/world", "", function(err, ok) {
        if (err) {
          fail(err);
        }

        expect(ok).toBe("");
        done();
      });
    });
  });

  describe("Get", () => {
    beforeEach(() => {
      mock({
        "/path/to/disk": {
        },
        "/path/to/disk/another/folder": {
          "hello": "OK"
        },
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it("should fail on missing", (done) => {
      var a = kv("/path/to/disk");

      a.get("/my/path", (err, data) => {
        if (!err) {
          fail("missing error");
        }

        done();
      });
    });

    it("should return the file value", (done) => {
      var a = kv("/path/to/disk");

      a.get("/another/folder/hello", (err, data) => {
        if (err) {
          fail(err);
          return done();
        }

        expect(data).toEqual("OK");
        done();
      });
    });
  });
});

