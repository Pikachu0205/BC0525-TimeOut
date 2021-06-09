import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from pylab import mpl

x_tick=["5node","10node","15node","20node","25node","30node"]
#x_tick=["35node","40node","45node","50node","55node","60node"]
#x_tick=["10node","20node","30node","40node","50node","60node"]
#x_tick=["570\n600\n660", "760\n800\n880", "950\n100\n1100", "1140\n1200\n1320", "1330\n1400\n1540", "1520\n1600\n1760", "1710\n1800\n1980", "1900\n2000\n2200"]
#x_tick=["12\n18\n42", "14\n21\n49", "16\n24\n56", "18\n27\n63", "20\n30\n70", "22\n33\n77", "24\n36\n84", "26\n39\n91", "28\n42\n98", "30\n45\n105"]
#x_tick=["330\n360\n420", "440\n480\n560", "550\n600\n700", "660\n720\n840", "770\n840\n980", "880\n960\n1120", "990\n1080\n1260", "1100\n1200\n1400"]
#y_tick=["8MB", "4MB", "2MB", "1MB", "512KB", "256KB"]
y_tick=["256KB", "512KB", "1MB", "2MB", "4MB",  "8MB"]

data = {}


import numpy as np

filename = 'TOaws.txt'

ele = []
with open(filename) as file : 
	for line in file : 
		line = line.strip().split(',')
		ele.append(line)
		
ele_array = np.array(ele)

file.close()

allsum = []

for line in ele_array:

    allsum.append( round(  sum( map(float, line) ) / len(line) , 2  ) )

allsum = np.array(allsum).reshape(6,6)
print(allsum)


pd_data=pd.DataFrame(allsum, index=y_tick, columns=x_tick)

mpl.rcParams['font.family'] = 'sans-serif'
mpl.rcParams['font.sans-serif'] = 'NSimSun,Times New Roman'
font = {'family': 'sans-serif',
            'color': 'k',
            'weight': 'normal',
            'size': 20,}


f, ax = plt.subplots(figsize=(16, 8))
cmap = sns.cm.rocket_r  #colorbar颜色反转
ax = sns.heatmap(pd_data, annot=True, ax=ax, fmt='.2f', cmap=cmap) #画heatmap，具体参数可以查文档




plt.title("Time Out AWS",fontsize=30)
#plt.title("Time Out 3",fontsize=30)


#plt.title("16node commit together\nTwo -step / Msig",fontsize=30) #图片标题文本和字体大小
#plt.title("31node\n950 1000 1100",fontsize=30) #图片标题文本和字体大小


plt.xlabel("number of node",fontsize=17.5, color='k') #x轴label的文本和字体大小
plt.ylabel("data size",fontsize=17.5, color='k') #y轴label的文本和字体大小
plt.xticks(fontsize=15) #x轴刻度的字体大小（文本包含在pd_data中了）
plt.yticks(fontsize=15) #y轴刻度的字体大小（文本包含在pd_data中了）


#设置colorbar的刻度字体大小
cax = plt.gcf().axes[-1] 
cax.tick_params(labelsize=20)


#设置colorbar的label文本和字体大小
cbar = ax.collections[0].colorbar
#cbar.set_label("MB / s",fontdict=font)
cbar.set_label("ms",fontdict=font)


plt.show()


'''node31 = [[
[0.73333, 0.20000, 0.73333, 0.40000, 5.46667, 4.80000, 4.33333, 3.93333],
[1.50000, 0.06667, 3.80000, 3.20000, 2.76667, 2.43333, 2.16667, 1.96667],
[0.03333, 0.03333, 1.91667, 1.61667, 1.38333, 1.21667, 1.10000, 0.98333],
[0.01667, 0.01667, 0.96667, 0.80833, 0.70000, 0.61667, 0.55000, 0.49167],
[0.00833, 0.59583, 0.48333, 0.40417, 0.35000, 0.30833, 0.27500, 0.24583],
[0.00417, 0.30000, 0.24375, 0.20417, 0.17500, 0.15417, 0.13750, 0.12292]
]]

node16 = [[
[4.06667, 0.26667, 0.13333, 10.13333, 8.93333, 7.86667, 7.06667, 6.40000],
[0.90000, 0.26667, 6.23333, 5.23333, 4.53333, 4.00000, 3.56667, 3.23333],
[5.08333, 0.03333, 3.15000, 2.63333, 2.28333, 2.01667, 1.80000, 1.63333],
[0.01667, 1.96667, 1.58333, 1.32500, 1.15000, 1.00833, 0.90000, 0.81667],
[0.00833, 0.98750, 0.79583, 0.67083, 0.57917, 0.50833, 0.45417, 0.40833],
[0.65208, 0.49375, 0.40000, 0.33542, 0.28958, 0.25417, 0.22708, 0.20417]
]]

node6 = [[
[1.37778, 1.82222, 1.46667, 0.48889, 1.37778, 0.57778, 2.00000, 1.64444, 0.97778, 1.06667],
[1.51111, 0.06667, 1.77778, 3.11111, 3.26667, 2.51111, 2.93333, 3.08889, 3.33333, 2.91111],
[1.16667, 2.50000, 2.65556, 2.56667, 2.05556, 2.53333, 3.36667, 2.57778, 2.55556, 2.37778],
[1.44444, 1.41667, 2.11111, 0.55556, 0.55000, 0.65556, 0.91111, 0.33889, 2.12222, 3.11667],
[0.26111, 0.52778, 1.65833, 1.36111, 2.48611, 5.14444, 8.46111, 9.39722, 7.99722, 7.83889],
[0.27500, 0.25000, 2.06944, 5.09583, 5.00694, 5.29444, 5.26389, 5.24722, 4.02361, 3.85278]
]]

compare = [[
[0.00667, 0.76917, 0.83125, 0.47458, 0.24875, 0.12708, 0.06458, 0.03250, 0, 2.67708, 1.59583, 0.89583, 0.48792, 0.25083, 0.12792, 0.06458, 0.03250],
[0.00625, 0.40375, 0.81583, 0.47375, 0.24875, 0.12708, 0.06417, 0.03250, 0, 2.53833, 1.59750, 0.89083, 0.48750, 0.25042, 0.12792, 0.06458, 0.03250],
[0.00500, 0.41958, 0.81583, 0.46292, 0.24917, 0.12708, 0.06458, 0.03250, 0, 0.10417, 1.58542, 0.89167, 0.48708, 0.25083, 0.12792, 0.06458, 0.03250],
[0.01500, 0.59583, 0.83375, 0.46458, 0.24917, 0.12708, 0.06458, 0.03250, 0, 2.67583, 1.59792, 0.89083, 0.48625, 0.25042, 0.12792, 0.06458, 0.03250],
[0.04958, 0.59583, 0.78042, 0.47583, 0.22042, 0.12750, 0.06458, 0.03250, 0, 2.67583, 1.58708, 0.89208, 0.48792, 0.25042, 0.12792, 0.06458, 0.03250],
[0.01625, 0.00042, 0.81833, 0.47125, 0.25000, 0.10292, 0.06458, 0.03250, 0, 2.67458, 1.58125, 0.89208, 0.48667, 0.25042, 0.12792, 0.06458, 0.03250]
]]

pd_data=pd.DataFrame(node31[0], index=y_tick, columns=x_tick)'''