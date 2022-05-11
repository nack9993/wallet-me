function Account() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-9/12 shadow-lg rounded-lg">
        <form>
          <div className="font-bold">
            <p>Username</p>
            <input type="text"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
