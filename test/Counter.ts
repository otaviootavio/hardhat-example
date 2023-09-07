import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Counter, Counter__factory, Lock } from "../typechain-types";

describe("Lock", function () {
  describe("Deployment", function () {
    it("Test initial values", async function () {
      const counterFactory = await ethers.getContractFactory("Counter");
      const counterContract: Counter = await counterFactory.deploy(BigInt(10));

      expect( await counterContract.count() ).to.equal( BigInt(10) );
    });
  });

  describe("Functions", function () {
    it("Test increment", async function () {
      const counterFactory = await ethers.getContractFactory("Counter");
      const counterContract: Counter = await counterFactory.deploy(BigInt(10));

      await counterContract.inc()

      expect( await counterContract.count() ).to.equal( BigInt(11) );
    });

    it("Test decrement", async function () {
      const counterFactory = await ethers.getContractFactory("Counter");
      const counterContract: Counter = await counterFactory.deploy(BigInt(10));
      
      await counterContract.dec()

      expect( await counterContract.count() ).to.equal( BigInt(9) );

    });

  });

  describe("Test ownership", function () {
    it("Test revert increment", async function () {
      const counterFactory = await ethers.getContractFactory("Counter");
      const counterContract: Counter = await counterFactory.deploy(BigInt(10));

      const [, addr] = await ethers.getSigners();


      await expect( counterContract.connect(addr).inc() ).to.be.rejectedWith("Must be the owner")
    });

    it("Test decrement", async function () {
      const counterFactory = await ethers.getContractFactory("Counter");
      const counterContract: Counter = await counterFactory.deploy(BigInt(10));
      
      const [, addr] = await ethers.getSigners();


      await expect( counterContract.connect(addr).dec() ).to.be.rejectedWith("Must be the owner")
    });

  });
});
