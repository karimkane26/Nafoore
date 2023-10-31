from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request, 'account/home.html')

def registerpage(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('loginpage')
        else:
            form = UserCreationForm()

    return render(request, 'account/registerPage.html', {'form':form})


def loginpage(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)

        if user is not None:
            login(request, user)
            return redirect('individualreport')
        else:
            messages.info(request,'Username or Password is incorrect')
            return redirect('loginpage')
    return render(request, 'account/loginpage.html')

def logoutpage(request):
    logout(request)
    return redirect('loginpage')

@login_required(login_url='login')
def individualreport(request):
    return render(request, 'account/individualreport.html')