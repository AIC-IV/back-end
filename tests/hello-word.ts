/* eslint-disable no-undef */
import chai, { expect } from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import app from '../src/index';
import 'mocha';

const userDeleted = {
  message: 'User deleted!',
};

const dataUpdated = {
  role: 'ADMIN',
};

const user = {
  username: 'Microsoft',
  email: 'hanis@gmail.com',
  password: '12345',
};

const userWrong = {
  email: 'meudsadaeus@gmail.com',
  password: '122222345',
};

const userErrorEmail = {
  message: 'Email already exists',
};

const userErrorPassword = {
  message: 'Invalid email or password',
};

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('Testes', () => {
  let token = '';
  let id = 1;
  // eslint-disable-next-line no-undef
  it('Create User in /user', (done) => {
    chai.request(app)
      .post('/user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        id = res.body.id;
        res.body.should.be.a('object');
        done();
      });
  });

  it('Create User with equal /user', (done) => {
    chai.request(app)
      .post('/user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.eql(userErrorEmail);
        done();
      });
  });

  it('Login user invalid password/email /session', (done) => {
    chai.request(app)
      .post('/session')
      .send(userWrong)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        expect(res.body).to.eql(userErrorPassword);
        done();
      });
  });

  it('Login /session', (done) => {
    chai.request(app)
      .post('/session')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        token = res.body.token;
        done();
      });
  });

  it('Update Data user - ', (done) => {
    chai.request(app)
      .patch('/user/update')
      .send(dataUpdated)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.eql(id);
        done();
      });
  });

  it('Delete user - need token auth - ', (done) => {
    chai.request(app)
      .delete(`/user/delete/${id}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.eql(userDeleted);
        done();
      });
  });
});
